# Samantha Barli's Template Repo

- Turborepo (monorepo)
- Apps
  - Backend
    - NestJS
    - MongoDB / Mongoose
    - PassportJS (auth)
    - Websockets (socketio)
    - Apollo GQL
  - Native
    - React Native
    - Expo
    - Apollo GQL
    - Gluestack-UI
    - Socket-IO
    - Expo-Router
  - Web
    - NextJS
- Packages
  - `eslint-custom-config`: shared eslint configs
  - `gql`: used by codegen to generate client-side GQL queries/mutations/hooks
  - `tsconfig`: shared tsconfig files
  - `types`: shared types & constants
  - `ui`: shared UI components
  - `utils`: shared utility functions

## Get Started

### Duplicating Template

- Create MongoDB Cluster & DB

- Create Expo Project at expo.dev

- Create & configure Doppler workspace

    Expects workspace for repo with 3 projects:

    1. backend
        - BACKEND_URL
        - JWT_REFRESH_SECRET
        - JWT_SECRET
        - MONGO_URL
        - PORT
        - SALT_ROUNDS
    2. native
        - EXPO_PUBLIC_BACKEND_URL
        - EXPO_PUBLIC_OWNER_HANDLE
        - EXPO_PUBLIC_PROJECT_ID
        - EXPO_PUBLIC_WEBSOCKET_URL
    3. shared
        - BACKEND_URL

### Repo Setup (First Run)

1. Install deps (from root dir)

```bash
yarn install
```

2. Install husky (if not already installed)

```bash
npx husky install
```

3. Connect repo to Doppler project

```bash
doppler login
# select the new workspace scope in the GUI
# back in terminal
doppler setup
# all default prompts should be correct
```

### Local

**Run the backend app**
```bash
# REOMMENDED
yarn dev:backend

# OR

# NOT RECOMMENDED
cd apps/backend && yarn dev

# OR

# NOT RECOMMENDED
yarn workspace @changeme/backend dev
```

**Run the native app**
```bash
# REOMMENDED
yarn dev:native

# OR

# NOT RECOMMENDED
cd apps/native && yarn dev

# OR

# NOT RECOMMENDED
yarn workspace @changeme/native dev
```

### Mongo

**!!Important**: If facing errors starting the backend due to Mongoose not connecting, make sure your IP is allow-listed in MongoDb.

## Codegen

1. Add client-side gql definitions to `packages/gql/src`
2. When you're ready to update the generated types, run `yarn codegen` from root
  1. Generated updates should be applied to `packages/gql/generated/graphql.tsx`
  2. @changeme/gql package will be rebuilt to ensure latest updates are available to consumers

## Tools

- Turborepo
- NestJs (backend app)
- Expo (native app)
- NextJs & React Native Web (web app)
- GraphQL
- Codegen
- Eslint
- Typescript