using BetweenUs.Api;

var builder = WebApplication.CreateBuilder(args);
// Never record requests, hub arguments, message bodies, or participant capabilities.
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.SetMinimumLevel(LogLevel.Warning);
builder.Services.AddSignalR(options =>
{
    options.MaximumReceiveMessageSize = 16 * 1024;
    options.EnableDetailedErrors = false;
});
builder.Services.AddSingleton<SessionCoordinator>();
var app = builder.Build();
// CORS does not protect WebSocket upgrades. Reject browser origins outside this deployment.
var allowedOrigins = (builder.Configuration["AllowedOrigins"] ?? "http://localhost:3000;https://localhost:8443")
    .Split(';', StringSplitOptions.RemoveEmptyEntries);
app.Use(async (context, next) =>
{
    if (context.Request.Path.StartsWithSegments("/hubs") &&
        context.Request.Headers.TryGetValue("Origin", out var origin) &&
        !allowedOrigins.Contains(origin.ToString(), StringComparer.OrdinalIgnoreCase))
    {
        context.Response.StatusCode = StatusCodes.Status403Forbidden;
        return;
    }
    context.Response.Headers.CacheControl = "no-store";
    await next(context);
});
app.MapGet("/api/health", () => Results.Ok(new { status = "ok", service = "between-us-backend" }));
app.MapHub<SessionHub>("/hubs/sessions");
app.Run();

public partial class Program;
