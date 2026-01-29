# Custom Amazon Connect CCP (Contact Control Panel)

A modern, responsive Contact Control Panel built with React and Vite for Amazon Connect. This custom CCP provides agents with an intuitive interface for handling customer interactions including voice calls, chat, and contact management.

## ✨ Features

- **Modern UI**: Clean, responsive design built with React and Tailwind CSS
- **Voice Calls**: Full call handling capabilities (incoming, outgoing, hold, transfer)
- **Chat Support**: Real-time chat interface for customer interactions
- **Agent Management**: Status control, availability settings, and agent information
- **Quick Connects**: Easy access to frequently used contacts and queues
- **Real-time Updates**: Live status updates and call duration tracking
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.3
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.18
- **Icons**: Lucide React 0.562.0
- **Amazon Connect**: amazon-connect-streams 2.22.1
- **Linting**: ESLint with React plugins

## 🎨 UI Components & Styling

### Tailwind CSS

This project uses **Tailwind CSS** for styling, providing:

- Utility-first CSS framework
- Responsive design system
- Custom color schemes and spacing
- Component-based styling approach

### Lucide React Icons

**Lucide React** is used for all icons throughout the application:

- Consistent icon design language
- Lightweight and performant
- Extensive icon library
- Easy customization and theming

```jsx
import { Phone, MessageCircle, Settings, User } from "lucide-react";

// Usage example
<Phone className="w-5 h-5 text-blue-600" />;
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Amazon Connect instance with proper permissions

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd custom-ccp
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Amazon Connect**

   Update the CCP configuration in `src/ccpConfig.js`:

   ```javascript
   export const CCP_CONFIG = {
     ccp_domain: "https://your-connect-instance.my.connect.aws",
     region: "your-aws-region", // e.g., "us-west-2"
   };
   ```

### 🏃‍♂️ Running Locally

1. **Start the development server**

   ```bash
   npm run dev
   ```

2. **Open your browser**

   Navigate to `http://localhost:5173` (or the port shown in your terminal)

3. **Login with your Amazon Connect credentials**

   Use your agent credentials to access the CCP interface

### 📦 Build for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

### 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🔧 Configuration

### Amazon Connect Setup

1. **CCP Domain**: Update your Connect instance URL in `ccpConfig.js`
2. **Region**: Set the correct AWS region for your Connect instance
3. **Permissions**: Ensure your agent has proper permissions for CCP access

### Customization

- **Styling**: Modify Tailwind classes or add custom CSS in `index.css`
- **Icons**: Replace or add new Lucide React icons as needed
- **Components**: Extend functionality by adding new components in the `components/` directory

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🆘 Support

For issues and questions:

- Check the Amazon Connect documentation
- Review the amazon-connect-streams library documentation
- Open an issue in this repository

## 🔗 Useful Links

- [Amazon Connect Documentation](https://docs.aws.amazon.com/connect/)
- [Amazon Connect Streams](https://github.com/amazon-connect/amazon-connect-streams)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Lucide React Icons](https://lucide.dev/)
