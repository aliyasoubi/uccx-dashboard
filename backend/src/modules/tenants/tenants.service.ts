import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';

export interface Tenant {
  id: string;
  name: string;
  settings: {
    kpis: string[];
    dataSources: string[];
    accessControl: {
      roles: string[];
      permissions: Record<string, string[]>;
    };
  };
}

@Injectable()
export class TenantsService {
  private logger = new Logger(TenantsService.name);
  private tenants: Map<string, Tenant> = new Map();

  constructor() {
    // Initialize with a default tenant for testing
    this.tenants.set('default', {
      id: 'default',
      name: 'Default Tenant',
      settings: {
        kpis: ['activeCalls', 'averageWaitTime', 'queueSize', 'csatScore'],
        dataSources: ['operator', 'queue', 'outbound', 'survey'],
        accessControl: {
          roles: ['admin', 'manager', 'operator'],
          permissions: {
            admin: ['view_all', 'configure', 'manage_users'],
            manager: ['view_all', 'configure_kpis'],
            operator: ['view_own', 'view_queue'],
          },
        },
      },
    });
  }

  getTenant(tenantId: string): Tenant | undefined {
    return this.tenants.get(tenantId);
  }

  createTenant(tenant: Omit<Tenant, 'id'>): Tenant {
    const id = this.generateTenantId();
    const newTenant = { ...tenant, id };
    this.tenants.set(id, newTenant);
    this.logger.log(`Created new tenant: ${id}`);
    return newTenant;
  }

  updateTenant(tenantId: string, updates: Partial<Tenant>): Tenant | undefined {
    const tenant = this.tenants.get(tenantId);
    if (!tenant) return undefined;

    const updatedTenant = { ...tenant, ...updates };
    this.tenants.set(tenantId, updatedTenant);
    this.logger.log(`Updated tenant: ${tenantId}`);
    return updatedTenant;
  }

  private generateTenantId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
} 