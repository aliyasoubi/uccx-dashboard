# UCCX IVR Monitoring Dashboard

A real-time monitoring dashboard for Cisco UCCX IVR data, built with modern web technologies and best practices.

## 🚀 Features

- Real-time IVR performance monitoring
- WebSocket-based instant updates
- Efficient data caching with Redis
- Scalable architecture
- Modern, responsive UI with Ant Design
- Interactive charts with Recharts

## 🛠 Tech Stack

### Backend
- **Framework**: NestJS
- **WebSockets**: Native WebSocket support
- **Caching & Pub/Sub**: Redis
- **Database**: PostgreSQL (if needed)

### Frontend
- **Framework**: React.js
- **State Management**: Redux Toolkit
- **UI Components**: Ant Design
- **Charts**: Recharts
- **WebSockets**: Native WebSocket client

## 📋 Project Structure

```
uccx-dashboard/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── modules/        # Feature modules
│   │   ├── common/         # Shared utilities
│   │   └── main.ts         # Application entry
│   └── package.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── features/       # Redux slices
│   │   ├── hooks/          # Custom hooks
│   │   └── App.tsx
│   └── package.json
└── docker/                 # Docker configurations
```

## 🎯 Implementation Phases

### Phase 1: Project Setup & Basic Infrastructure
- [x] Initialize project structure
- [ ] Set up NestJS backend
- [ ] Configure Redis for caching
- [ ] Set up React frontend
- [ ] Implement basic WebSocket connection

### Phase 2: Backend Development
- [ ] Create UCCX data collection service
- [ ] Implement Redis caching strategy
- [ ] Set up WebSocket gateway
- [ ] Create API endpoints for historical data

### Phase 3: Frontend Development
- [ ] Implement WebSocket client
- [ ] Create dashboard layout
- [ ] Build real-time charts
- [ ] Add data filtering and controls

### Phase 4: Testing & Optimization
- [ ] Performance testing
- [ ] Load testing
- [ ] Code optimization
- [ ] Documentation

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- Redis
- PostgreSQL (optional)
- Docker (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/aliyasoubi/uccx-dashboard.git
cd uccx-dashboard
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Configure environment variables:
```bash
# Backend (.env)
REDIS_HOST=localhost
REDIS_PORT=6379
UCCX_API_URL=your_uccx_api_url
UCCX_API_KEY=your_api_key

# Frontend (.env)
REACT_APP_WS_URL=ws://localhost:3001
REACT_APP_API_URL=http://localhost:3000
```

5. Start the development servers:
```bash
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm start
```

## 📊 Architecture Overview

### Data Flow
1. UCCX data is collected by the backend service
2. Data is cached in Redis
3. Redis Pub/Sub broadcasts updates
4. WebSocket server pushes updates to clients
5. Frontend receives and displays updates

### Key Components
- **Data Collection Service**: Fetches data from UCCX
- **Redis Cache**: Stores and distributes real-time data
- **WebSocket Gateway**: Handles real-time client connections
- **Dashboard UI**: Displays metrics and charts

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Cisco UCCX API documentation
- NestJS team for the amazing framework
- Redis for the powerful caching solution
