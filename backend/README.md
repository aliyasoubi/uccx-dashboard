# UCCX Dashboard Backend

A NestJS-based backend service for the UCCX IVR Monitoring Dashboard, providing real-time and historical data for operators, queues, and other UCCX metrics.

## Features

- Real-time monitoring of UCCX operators and queues
- Historical data tracking and analysis
- Multi-tenant support with role-based access control
- WebSocket integration for real-time updates
- Redis caching for improved performance
- Swagger API documentation
- Retry mechanism for UCCX API calls
- Configurable polling intervals
- Data validation using class-validator
- Environment-specific configuration (.env.development, .env.production)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Redis server
- Access to UCCX server

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd uccx-dashboard/backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create environment-specific files in the root directory:

For development (.env.development):
```env
# Application
PORT=3001
NODE_ENV=development

# UCCX Configuration
UCCX_HOST=http://uccx. sample . com/ir
UCCX_PORT=9080
UCCX_USERNAME=dev-username
UCCX_PASSWORD=dev-password
UCCX_POLLING_INTERVAL=30000
UCCX_RETRY_ATTEMPTS=3
UCCX_RETRY_DELAY=1000

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=dev-redis-password
REDIS_DB=0
REDIS_TTL=60
```

For production (.env.production):
```env
# Application
PORT=3001
NODE_ENV=production

# UCCX Configuration
UCCX_HOST=http://uccx. sample . com/ir
UCCX_PORT=9080
UCCX_USERNAME=prod-username
UCCX_PASSWORD=prod-password
UCCX_POLLING_INTERVAL=30000
UCCX_RETRY_ATTEMPTS=3
UCCX_RETRY_DELAY=1000

# Redis Configuration
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=prod-redis-password
REDIS_DB=0
REDIS_TTL=60
```

## Project Structure

```
backend/
├── src/
│   ├── modules/
│   │   ├── data-sources/     # Data source services (operators, queues, etc.)
│   │   ├── redis/            # Redis caching implementation
│   │   ├── tenants/          # Multi-tenant support
│   │   ├── uccx/             # UCCX API integration
│   │   └── websocket/        # WebSocket implementation
│   ├── config/               # Configuration management
│   └── common/               # Shared interfaces and utilities
├── test/                     # Test files
├── .env.development          # Development environment variables
├── .env.production           # Production environment variables
└── package.json              # Project dependencies and scripts
```

## Configuration Best Practices

1. **UCCX Connection**:
   - Use environment variables for sensitive data
   - Implement retry mechanism for failed requests
   - Set appropriate timeout values
   - Use connection pooling if available

2. **Redis Caching**:
   - Configure appropriate TTL for cached data
   - Use separate Redis databases for different data types
   - Implement cache invalidation strategies

3. **Security**:
   - Never commit sensitive data to version control
   - Use environment variables for all secrets
   - Implement proper authentication and authorization
   - Use HTTPS for all API endpoints

4. **Performance**:
   - Configure appropriate polling intervals
   - Implement data aggregation where possible
   - Use WebSocket for real-time updates
   - Implement proper error handling and logging

## Running the Application

Development mode:
```bash
npm run start:dev
```

Production mode:
```bash
npm run build
npm run start:prod
```

## API Documentation

The API documentation is available at `/api` when running the application. It includes:
- Swagger UI for interactive API exploration
- Detailed endpoint descriptions
- Request/response schemas
- Authentication requirements

## Dependencies

Key dependencies:
- @nestjs/common: ^11.0.15
- @nestjs/config: ^4.0.2
- @nestjs/core: ^11.0.15
- class-validator: ^0.14.1
- class-transformer: ^0.5.1
- ioredis: ^5.3.0
- axios: ^1.8.4

## Development Tools

- ESLint for code linting
- Prettier for code formatting
- Jest for testing
- Swagger for API documentation

## Error Handling

The application implements comprehensive error handling:
- Global exception filters
- Validation pipes for request validation
- Retry mechanisms for external service calls
- Detailed error logging

## Monitoring and Logging

- Console logging for development
- Structured logging for production
- Performance monitoring
- Error tracking

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT 