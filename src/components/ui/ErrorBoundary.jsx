import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("ReactMarkdown rendering caught by ErrorBoundary:", error);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.children !== this.props.children) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-[#2A2D2E] whitespace-pre-wrap font-sans p-4 bg-red-50 border border-red-100 rounded">
          {this.props.fallbackText || "Error rendering markdown content."}
        </div>
      );
    }
    return this.props.children || null;
  }
}

export default ErrorBoundary;
