import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { TenantsService, Tenant } from './tenants.service';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Get(':id')
  getTenant(@Param('id') id: string): Tenant | undefined {
    return this.tenantsService.getTenant(id);
  }

  @Post()
  createTenant(@Body() tenant: Omit<Tenant, 'id'>): Tenant {
    return this.tenantsService.createTenant(tenant);
  }

  @Put(':id')
  updateTenant(
    @Param('id') id: string,
    @Body() updates: Partial<Tenant>,
  ): Tenant | undefined {
    return this.tenantsService.updateTenant(id, updates);
  }
} 