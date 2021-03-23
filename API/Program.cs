using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Persistence;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            // Creating and using an scope to resolve dependencies
            using var scope = host.Services.CreateScope();

            // Getting the services from the scope
            var services = scope.ServiceProvider;

            try{
                // We now get the DataContext service added in Startup.cs
                var context = services.GetRequiredService<DataContext>();
                // Migrate the versions of the database of the DataContext
                // We have all the models there for the Entity Framework to create the tables
                await context.Database.MigrateAsync();
                await Seed.SeedData(context);
            }
            catch(Exception err)
            {
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(err, "An error ocurred during migration");
            }

            await host.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
