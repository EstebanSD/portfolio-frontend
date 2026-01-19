'use client';

import { useEffect, useState } from 'react';
import {
  RefreshCwIcon,
  RotateCcwIcon,
  AlertTriangleIcon,
  BugIcon,
  WifiIcon,
  ClockIcon,
  CopyIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Alert,
  AlertDescription,
  Badge,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const [isStackOpen, setIsStackOpen] = useState(false);

  // Error log for debugging (only in development)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error captured by error.tsx:', error);
    }
  }, [error]);

  const copyErrorToClipboard = async () => {
    const errorText = `Error: ${error.message}\nDigest: ${error.digest || 'N/A'}\nStack:\n${
      error.stack || 'No stack available'
    }`;
    try {
      await navigator.clipboard.writeText(errorText);
    } catch (err) {
      console.error('Failed to copy error to clipboard:', err);
    }
  };

  // Determine the appropriate error type and message
  const getErrorInfo = () => {
    const errorMessage = error.message.toLowerCase();

    if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
      return {
        title: 'Connection problem',
        description:
          'We were unable to connect to the server. Please check your internet connection.',
        icon: WifiIcon,
        type: 'network',
        variant: 'destructive' as const,
      };
    }

    if (errorMessage.includes('timeout')) {
      return {
        title: 'Timeout expired',
        description: 'The request took too long to process. Please try again.',
        icon: ClockIcon,
        type: 'timeout',
        variant: 'default' as const,
      };
    }

    /// Currently handled by middleware ///

    // if (errorMessage.includes('not found') || errorMessage.includes('404')) {
    //   return {
    //     title: 'Content not found',
    //     description: 'The content you are looking for is not available at this time.',
    //     icon: Search,
    //     type: 'notfound',
    //     variant: 'secondary' as const,
    //   };
    // }

    // if (errorMessage.includes('unauthorized') || errorMessage.includes('401')) {
    //   return {
    //     title: 'Unauthorized access',
    //     description: 'You do not have permission to access this content.',
    //     icon: Lock,
    //     type: 'auth',
    //     variant: 'destructive' as const,
    //   };
    // }

    return {
      title: 'Something went wrong',
      description:
        process.env.NODE_ENV === 'development'
          ? error.message
          : 'An unexpected error has occurred. Our team has been notified.',
      icon: AlertTriangleIcon,
      type: 'generic',
      variant: 'destructive' as const,
    };
  };

  const errorInfo = getErrorInfo();
  const IconComponent = errorInfo.icon;

  const handleReload = () => {
    window.location.reload();
  };

  //   const handleReportError = () => {
  //     const subject = encodeURIComponent(`Error Report: ${errorInfo.title}`);
  //     const body = encodeURIComponent(
  //       `Error Type: ${errorInfo.type}\n` +
  //         `Error Message: ${error.message}\n` +
  //         `Error Digest: ${error.digest || 'N/A'}\n` +
  //         `URL: ${window.location.href}\n` +
  //         `User Agent: ${navigator.userAgent}\n` +
  //         `Timestamp: ${new Date().toISOString()}`,
  //     );

  //     window.open(`mailto:soporte@tudominio.com?subject=${subject}&body=${body}`);
  //   };

  return (
    <div className="min-h-[50vh] flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-background dark:bg-muted">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
            <IconComponent className="h-6 w-6 text-muted-foreground" />
          </div>
          <CardTitle className="text-xl">{errorInfo.title}</CardTitle>
          <CardDescription className="text-base">{errorInfo.description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {process.env.NODE_ENV === 'development' && (
            <Alert>
              <BugIcon className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-3 w-full">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">Debug Information</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyErrorToClipboard}
                      className="h-6 px-2"
                    >
                      <CopyIcon className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                  </div>

                  <div className="font-mono text-xs space-y-2">
                    <div className="break-words">
                      <strong>Error:</strong> {error.message}
                    </div>
                    {error.digest && (
                      <div className="break-words">
                        <strong>Digest:</strong> {error.digest}
                      </div>
                    )}
                  </div>

                  {/* Stack trace collapsable */}
                  {error.stack && (
                    <Collapsible open={isStackOpen} onOpenChange={setIsStackOpen}>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-0 h-auto font-mono text-xs hover:bg-transparent"
                        >
                          <strong>Stack Trace</strong>
                          {isStackOpen ? (
                            <ChevronUpIcon className="h-3 w-3 ml-1" />
                          ) : (
                            <ChevronDownIcon className="h-3 w-3 ml-1" />
                          )}
                        </Button>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <div className="mt-2 max-h-40 overflow-y-auto bg-muted/50 p-3 rounded border">
                          <pre className="text-xs whitespace-pre-wrap break-words">
                            {error.stack.split('\n').map((line, index) => (
                              <div
                                key={index}
                                className="break-all hover:bg-muted/50 px-1 rounded mb-1"
                              >
                                {line}
                              </div>
                            ))}
                          </pre>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-center">
            <Badge variant={errorInfo.variant} className="capitalize">
              {errorInfo.type} error
            </Badge>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-3">
          <div className="flex gap-2 w-full">
            <Button onClick={() => reset()} className="flex-1" size="sm">
              <RotateCcwIcon className="w-4 h-4 mr-2" />
              Try again
            </Button>

            <Button variant="outline" onClick={handleReload} className="flex-1" size="sm">
              <RefreshCwIcon className="w-4 h-4 mr-2" />
              Recharge
            </Button>
          </div>

          <div className="flex gap-2 w-full">
            <Button
              variant="ghost"
              size="sm"
              className="flex-1"
              onClick={() => window.history.back()}
            >
              ← Back
            </Button>

            {/* <Button variant="ghost" size="sm" className="flex-1" onClick={handleReportError}>
              <ExternalLinkIcon className="w-4 h-4 mr-1" />
              Report
            </Button> */}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
