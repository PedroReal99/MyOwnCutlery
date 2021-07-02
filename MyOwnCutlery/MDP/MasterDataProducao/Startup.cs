using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MasterDataProducao.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using GenericSharedApi.Models;
using MasterDataProducao.Persistence;

namespace MasterDataProducao
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });
            // services.AddDbContext<MasterContext>(options =>
            //options.UseSqlServer(Configuration.GetConnectionString("DevConnection")));
            services.AddDbContext<MasterContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("CloudConnection")));
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddTransient<IProductRepository, ProductRepository>();
            services.AddTransient<IManufacturingPlanRepository, ManufacturingPlanRepository>();
            services.AddTransient<IOperationRepository,OperationRepository>();

            services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
				{
					builder.AllowAnyOrigin()
						   .AllowAnyMethod()
						   .AllowAnyHeader();
				}));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseCors("MyPolicy");
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
