import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { DataSourcesService } from './data-sources.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('data-sources')
@Controller('data-sources')
export class DataSourcesController {
  constructor(private readonly dataSourcesService: DataSourcesService) {}

  @Get('aggregated/:tenantId/:userId')
  @ApiOperation({ summary: 'Get aggregated data for a specific tenant and user' })
  @ApiParam({ name: 'tenantId', description: 'Tenant ID' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiQuery({ name: 'role', description: 'User role', required: true })
  @ApiResponse({ status: 200, description: 'Returns aggregated data' })
  async getAggregatedData(
    @Param('tenantId') tenantId: string,
    @Param('userId') userId: string,
    @Query('role') role: string,
  ) {
    return this.dataSourcesService.getAggregatedData(tenantId, userId, role);
  }

  @Get('historical/:tenantId/:userId')
  @ApiOperation({ summary: 'Get historical data for a specific tenant and user' })
  @ApiParam({ name: 'tenantId', description: 'Tenant ID' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiQuery({ name: 'role', description: 'User role', required: true })
  @ApiQuery({ name: 'startTime', description: 'Start time', required: true })
  @ApiQuery({ name: 'endTime', description: 'End time', required: true })
  @ApiResponse({ status: 200, description: 'Returns historical data' })
  async getHistoricalData(
    @Param('tenantId') tenantId: string,
    @Param('userId') userId: string,
    @Query('role') role: string,
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
  ) {
    return this.dataSourcesService.getHistoricalData(
      tenantId,
      userId,
      role,
      new Date(startTime),
      new Date(endTime),
    );
  }
} 