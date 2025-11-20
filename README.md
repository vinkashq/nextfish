# Vinkas NextFire

A modern, full-stack Next.js application template built with Firebase, shadcn/ui, TypeScript, and AI capabilities. This project provides a solid foundation for building scalable web applications with authentication, admin panels, and plugin architecture.

## Disclaimer

- ⚠️ The project is under **very active** development.
- ⚠️ Expect bugs and breaking changes.

## 🚀 Features

- **Next.js 16** with App Router and Turbopack support
- **Firebase Integration**
  - Authentication (Email/Password, Email Link, Google Sign-In)
  - Firestore Database
  - Cloud Storage
  - Firebase Emulators for local development
- **AI Capabilities**
  - Google Genkit integration
  - Google Imagen for image generation
  - Gemini chatbot support
- **Modern UI**
  - shadcn/ui components
  - Tailwind CSS 4
  - Dark/Light theme support
  - Responsive design
- **Plugin System** - Extensible architecture for adding custom features
- **Admin Panel** - User management and image administration
- **Type Safety** - Full TypeScript support
- **Testing** - Jest and Playwright test setup
- **Code Quality** - ESLint, Husky pre-commit hooks

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ and **pnpm** (package manager)
- **Firebase CLI** - `npm install -g firebase-tools`
- **Google Cloud SDK** (for Genkit/AI features)
- A Firebase project with the following services enabled:
  - Authentication
  - Firestore Database
  - Cloud Storage

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vinkashq/nextfire.git
   cd nextfire
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory with the following variables:
   
   ```env
   # Firebase Web App Configuration (JSON string)
   FIREBASE_WEBAPP_CONFIG={"apiKey":"your_api_key","authDomain":"your_project.firebaseapp.com","projectId":"your_project_id","storageBucket":"your_project.appspot.com","messagingSenderId":"your_sender_id","appId":"your_app_id","measurementId":"your_measurement_id"}

   # Application Configuration
   NEXT_PUBLIC_APP_NAME=NextFire
   NEXT_PUBLIC_APP_TITLE=Next.js + Firebase + Shadcn UI Template
   NEXT_PUBLIC_HOSTNAME=your-domain.com

   # Legal Information (Optional)
   NEXT_PUBLIC_LEGAL_BUSINESS_NAME=Your Company Name
   NEXT_PUBLIC_LEGAL_BUSINESS_ADDRESS=Your Address
   NEXT_PUBLIC_LEGAL_BUSINESS_COUNTRY=Your Country
   NEXT_PUBLIC_LEGAL_CONTACT_EMAIL=your-email@example.com

   # reCAPTCHA (Optional - Required for Firebase App Check)
   NEXT_PUBLIC_RE_CAPTCHA_SITE_KEY=your_recaptcha_site_key

   # Theme Colors (Optional)
   NEXT_THEME_PRIMARY_COLOR=#171717
   NEXT_THEME_PRIMARY_FOREGROUND_COLOR=#fafafa
   ```
   
   **Note**: For Firebase App Hosting, configure `NEXT_PUBLIC_RE_CAPTCHA_SITE_KEY` as a secret in `apphosting.yaml` (see Configuration section).

4. **Set up Firebase Admin SDK**
   
   For server-side operations, you'll need to set up Firebase Admin credentials. Place your service account key file in the project root or configure it via environment variables.

5. **Install Playwright browsers** (for E2E testing)
   ```bash
   pnpm run playwright:install
   ```

## 🚀 Getting Started

### Development

Start the development server with Turbopack:
```bash
 pnpm run dev
```

For plugin development:
```bash
 pnpm run plugin
```

The application will be available at `http://localhost:3000`.

### Firebase Emulators

Run Firebase emulators for local development:
```bash
 pnpm run serve
```

This starts the Firebase emulators including:
- App Hosting Emulator (port 5002)
- Firebase UI

### Building for Production

```bash
 pnpm run build
 pnpm start
```

## 📁 Project Structure

```
nextfire/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (plugins)/         # Plugin routes
│   │   ├── (website)/         # Public website routes
│   │   ├── admin/             # Admin panel
│   │   ├── api/               # API routes
│   │   ├── app/               # Application routes
│   │   └── auth/              # Authentication pages
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   └── ...               # Custom components
│   ├── config/               # Configuration files
│   ├── context/              # React contexts
│   ├── firebase/             # Firebase client/server setup
│   ├── genkit/               # Genkit AI flows
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions
│   └── types/                # TypeScript type definitions
├── plugins/                   # Plugin directory
├── public/                    # Static assets
├── tests/                     # Test files
│   ├── jest/                # Unit tests
│   └── playwright/          # E2E tests
└── ...                       # Configuration files
```

## 🔌 Plugin System

NextFire includes a plugin architecture that allows you to extend functionality. To create a plugin:

1. Create a directory in the `plugins/` folder
2. Add your routes in `plugins/your-plugin/routes/`
3. Uncomment and configure the plugin route in `next.config.ts`:
   ```typescript
   withPluginRoutes('your-plugin-directory-name');
   ```

## 🔐 Authentication

The application supports multiple authentication methods:

- **Email/Password** - Traditional email and password authentication
- **Email Link** - Passwordless authentication via email link
- **Google Sign-In** - OAuth authentication with Google
  - Automatically uses **popup** method when deployed on a custom domain
  - Uses **redirect** method when the auth domain matches the hostname (for better compatibility)
- **Forgot Password** - Password reset functionality

**Firebase Auth Rewrites**: The application includes automatic rewrites for Firebase Auth handler paths (`/__/auth/*`) to support custom domains. This is configured in `next.config.ts` and requires the `FIREBASE_WEBAPP_CONFIG` environment variable.

Authentication pages are located in `src/app/auth/`.

## 👨‍💼 Admin Panel

Access the admin panel at `/admin` (requires admin privileges). Features include:

- **User Management** - View and edit user accounts
- **Image Administration** - Manage generated images
  - Dynamic rendering for real-time image updates
  - Image generation with Google Imagen
  - Image metadata tracking (dimensions, aspect ratio, file size)
- **Data Tables** - Built with TanStack Table

## 🎨 UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) components built on Radix UI and Tailwind CSS. All components are customizable and located in `src/components/ui/`.

Key components include:
- Buttons, Cards, Dialogs
- Data Tables
- Forms with React Hook Form
- Sidebar navigation
- Theme toggle

## 🤖 AI Features

### Image Generation

The application includes Google Imagen integration for AI-powered image generation:

- Flow-based architecture using Genkit
- Automatic image storage in Firebase Storage
- Metadata tracking in Firestore

### Chatbot

Gemini chatbot integration for conversational AI features.

## 🧪 Testing

### Unit Tests (Jest)

```bash
 pnpm test
 pnpm test:watch
```

Tests are located in `tests/jest/`.

### E2E Tests (Playwright)

```bash
 pnpm playwright
```

Tests are located in `tests/playwright/`.

## 📝 Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm plugin` - Start development server for plugin development
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm test` - Run Jest tests
- `pnpm test:watch` - Run Jest tests in watch mode
- `pnpm playwright` - Run Playwright E2E tests
- `pnpm playwright:install` - Install Playwright browsers
- `pnpm serve` - Start Firebase emulators
- `pnpm login` - Login to Google Cloud for Genkit
- `pnpm valet` - (Optional) Use Valet for local development with a secure URL

## 🔧 Configuration

### Next.js Configuration

Edit `next.config.ts` to customize:
- Plugin routes
- Headers and caching
- Redirects
- **Firebase Auth rewrites** - Automatically configured for custom domains when `FIREBASE_WEBAPP_CONFIG` is set
- Webpack configuration

The Firebase Auth rewrites allow Firebase Authentication to work properly on custom domains by forwarding requests from `__/auth/*` paths to the Firebase project's default domain.

### Firebase Configuration

Firebase settings are configured in:
- `firebase.json` - Firebase project configuration
- `apphosting.yaml` - App Hosting configuration (includes reCAPTCHA site key secret)
- `apphosting.emulator.yaml` - Emulator configuration

**Firebase Options Handling**: The application uses `FIREBASE_WEBAPP_CONFIG` as a JSON string for Firebase configuration. This allows for server-side and client-side use of the same configuration.

The storage bucket is automatically initialized from the Firebase options, eliminating the need for hardcoded bucket names.

### Theme Configuration

Customize themes in `src/config/index.ts` or via environment variables.

## 🚢 Deployment

### Firebase App Hosting

This project is configured for Firebase App Hosting. To deploy:

1. Ensure you're logged in to Firebase:
   ```bash
   firebase login
   ```

2. Configure your Firebase project:
   ```bash
   firebase use your-project-id
   ```

3. **Set up secrets** (if using reCAPTCHA):
   Configure secrets in Firebase Secret Manager and reference them in `apphosting.yaml`:
   ```yaml
   env:
     - variable: NEXT_PUBLIC_RE_CAPTCHA_SITE_KEY
       secret: RE_CAPTCHA_SITE_KEY
       availability:
         - BUILD
         - RUNTIME
   ```

4. Deploy:
   ```bash
   firebase deploy --only apphosting
   ```

**Custom Domain Support**: When deploying to a custom domain, Firebase Auth rewrites are automatically configured to ensure authentication flows work correctly. The Google Sign-In will use popup mode on custom domains for better UX.

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Vercel
- Netlify
- AWS Amplify
- Docker containers

## 📚 Tech Stack

- **Framework**: Next.js 16.0.1 (with dynamic rendering support)
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 4.1.16
- **UI Components**: shadcn/ui (Radix UI)
- **Backend**: Firebase (Auth, Firestore, Storage)
  - Firebase Auth with automatic popup/redirect handling
  - Firebase Auth rewrites for custom domains
- **AI**: Google Genkit, Imagen, Gemini
- **State Management**: Nanostores
- **Forms**: React Hook Form + Zod
- **Testing**: Jest, Playwright
- **Package Manager**: pnpm

## 🔄 Recent Updates

- **Firebase Configuration**: Support for `FIREBASE_WEBAPP_CONFIG` environment variable for server-side configuration
- **Google Sign-In**: Automatic popup/redirect selection based on auth domain
- **Firebase Auth Rewrites**: Automatic configuration for custom domain deployments
- **Dynamic Rendering**: Images page now uses dynamic rendering for real-time updates
- **Storage Initialization**: Automatic storage bucket initialization from Firebase options
- **reCAPTCHA Integration**: Enhanced configuration support in App Hosting

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Vinkas**

- GitHub: [@vinkashq](https://github.com/vinkashq)
- Repository: [nextfire](https://github.com/vinkashq/nextfire)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Firebase](https://firebase.google.com/) - Backend as a Service
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Google Genkit](https://genkit.dev/) - AI development framework

## 📞 Support

For support, please open an issue in the [GitHub repository](https://github.com/vinkashq/nextfire/issues).

---

Made with ❤️ by Vinkas
