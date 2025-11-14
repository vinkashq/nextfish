import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { toast } from 'sonner';
import SignupPage from '@/app/auth/signup/page';
import { useFirebase } from '@/context/firebase/Context';

// Mock Firebase auth functions
jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  sendEmailVerification: jest.fn(),
}));

// Mock sonner toast
jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

// Mock Firebase context
jest.mock('@/context/firebase/Context', () => ({
  useFirebase: jest.fn(),
}));

// Mock Next.js Link and Image
import React from 'react';

const MockNextLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
  return <a href={href}>{children}</a>;
};
MockNextLink.displayName = 'MockNextLink';
jest.mock('next/link', () => MockNextLink);

jest.mock('next/image', () => {
  const NextImage = ({ src, alt }: { src: string; alt: string }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src as string} alt={alt} />;
  };
  NextImage.displayName = 'MockNextImage';
  return NextImage;
});

// Mock config
jest.mock('@/config', () => ({
  privacyPolicyUrl: '/policies/privacy',
  termsOfServiceUrl: '/policies/terms',
}));

// Mock GoogleSignInButton
jest.mock('@/components/google-signin-button', () => {
  return function GoogleSignInButton() {
    return <button>Sign in with Google</button>;
  };
});

// Mock BreadcrumbHeading
jest.mock('@/components/breadcrumb-heading', () => {
  return function BreadcrumbHeading({ text }: { text: string }) {
    return <div>{text}</div>;
  };
});

describe('Signup Page', () => {
  const mockAuth = {
    currentUser: null,
  };

  const mockUser = {
    uid: 'test-uid-123',
    email: 'test@example.com',
    emailVerified: false,
  };

  const mockUserCredential = {
    user: mockUser,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useFirebase as jest.Mock).mockReturnValue({
      auth: mockAuth,
    });
  });

  describe('Form Rendering', () => {
    it('renders the signup form with all required fields', () => {
      render(<SignupPage />);

      expect(screen.getByText('Create an account')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Create Account/i })).toBeInTheDocument();
    });

    it('renders email input with correct attributes', () => {
      render(<SignupPage />);

      const emailInput = screen.getByLabelText('Email');
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('placeholder', 'name@example.com');
      expect(emailInput).toHaveAttribute('autoComplete', 'email');
      expect(emailInput).toBeRequired();
    });

    it('renders password input with correct attributes', () => {
      render(<SignupPage />);

      const passwordInput = screen.getByLabelText('Password');
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(passwordInput).toBeRequired();
    });

    it('renders links to terms of service and privacy policy', () => {
      render(<SignupPage />);

      expect(screen.getByText(/Terms of Service/i)).toHaveAttribute('href', '/policies/terms');
      expect(screen.getByText(/Privacy Policy/i)).toHaveAttribute('href', '/policies/privacy');
    });

    it('renders link to login page', () => {
      render(<SignupPage />);

      expect(screen.getByText(/Log in/i)).toHaveAttribute('href', '/auth/login');
    });

    it('renders Google sign-in button', () => {
      render(<SignupPage />);

      expect(screen.getByText('Sign in with Google')).toBeInTheDocument();
    });
  });

  describe('Successful Signup', () => {
    it('creates account successfully with valid email and password', async () => {
      (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUserCredential);
      (sendEmailVerification as jest.Mock).mockResolvedValue(undefined);

      render(<SignupPage />);

      const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
      const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
      const form = emailInput.closest('form') as HTMLFormElement;

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.submit(form);

      await waitFor(() => {
        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
          mockAuth,
          'test@example.com',
          'password123'
        );
      });

      await waitFor(() => {
        expect(sendEmailVerification).toHaveBeenCalledWith(mockUser);
      });
    });

    it('displays success message after successful signup', async () => {
      (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUserCredential);
      (sendEmailVerification as jest.Mock).mockResolvedValue(undefined);

      render(<SignupPage />);

      const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
      const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
      const form = emailInput.closest('form') as HTMLFormElement;

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.submit(form);

      await waitFor(() => {
        expect(screen.getByText(/Your account created successfully!/i)).toBeInTheDocument();
      });

      expect(screen.getByText(/Please check your email at/i)).toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
    });

    it('clears form inputs after successful signup', async () => {
      (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUserCredential);
      (sendEmailVerification as jest.Mock).mockResolvedValue(undefined);

      render(<SignupPage />);

      const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
      const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
      const form = emailInput.closest('form') as HTMLFormElement;

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      expect(emailInput.value).toBe('test@example.com');
      expect(passwordInput.value).toBe('password123');

      fireEvent.submit(form);

      await waitFor(() => {
        expect(createUserWithEmailAndPassword).toHaveBeenCalled();
      });

      // Form should be cleared after successful signup
      await waitFor(() => {
        expect(emailInput.value).toBe('');
        expect(passwordInput.value).toBe('');
      });
    });

    it('disables form during submission', async () => {
      (createUserWithEmailAndPassword as jest.Mock).mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve(mockUserCredential), 100))
      );
      (sendEmailVerification as jest.Mock).mockResolvedValue(undefined);

      render(<SignupPage />);

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /Create Account/i });
      const form = emailInput.closest('form') as HTMLFormElement;

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.submit(form);

      // Form should be disabled during submission
      await waitFor(() => {
        expect(emailInput).toBeDisabled();
        expect(passwordInput).toBeDisabled();
        expect(submitButton).toBeDisabled();
      });

      await waitFor(() => {
        expect(createUserWithEmailAndPassword).toHaveBeenCalled();
      });
    });
  });

  describe('Signup Errors', () => {
    it('displays error toast when account creation fails', async () => {
      const error = {
        code: 'auth/email-already-in-use',
        message: 'The email address is already in use by another account.',
      };
      (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(error);

      render(<SignupPage />);

      const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
      const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
      const form = emailInput.closest('form') as HTMLFormElement;

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.submit(form);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith(
          'auth/email-already-in-use The email address is already in use by another account.',
          { duration: Infinity }
        );
      });
    });

    it('displays error toast when Firebase returns invalid email error', async () => {
      const error = {
        code: 'auth/invalid-email',
        message: 'The email address is not valid.',
      };
      (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(error);

      render(<SignupPage />);

      const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
      const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
      const form = emailInput.closest('form') as HTMLFormElement;

      // Use valid email format (HTML5 validation passes), but Firebase rejects it
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.submit(form);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith(
          'auth/invalid-email The email address is not valid.',
          { duration: Infinity }
        );
      });
    });

    it('displays error toast when password is too weak', async () => {
      const error = {
        code: 'auth/weak-password',
        message: 'The password is too weak.',
      };
      (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(error);

      render(<SignupPage />);

      const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
      const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
      const form = emailInput.closest('form') as HTMLFormElement;

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'weak' } });
      fireEvent.submit(form);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith(
          'auth/weak-password The password is too weak.',
          { duration: Infinity }
        );
      });
    });

    it('does not call sendEmailVerification when account creation fails', async () => {
      const error = {
        code: 'auth/email-already-in-use',
        message: 'The email address is already in use by another account.',
      };
      (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(error);

      render(<SignupPage />);

      const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
      const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
      const form = emailInput.closest('form') as HTMLFormElement;

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.submit(form);

      await waitFor(() => {
        expect(createUserWithEmailAndPassword).toHaveBeenCalled();
      });

      expect(sendEmailVerification).not.toHaveBeenCalled();
    });

    it('enables form after error occurs', async () => {
      const error = {
        code: 'auth/email-already-in-use',
        message: 'The email address is already in use by another account.',
      };
      (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(error);

      render(<SignupPage />);

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /Create Account/i });
      const form = emailInput.closest('form') as HTMLFormElement;

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.submit(form);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalled();
      });

      // Form should be enabled after error
      await waitFor(() => {
        expect(emailInput).not.toBeDisabled();
        expect(passwordInput).not.toBeDisabled();
        expect(submitButton).not.toBeDisabled();
      });
    });
  });

  describe('Email Verification', () => {
    it('sends email verification after successful account creation', async () => {
      (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUserCredential);
      (sendEmailVerification as jest.Mock).mockResolvedValue(undefined);

      render(<SignupPage />);

      const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
      const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
      const form = emailInput.closest('form') as HTMLFormElement;

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.submit(form);

      await waitFor(() => {
        expect(sendEmailVerification).toHaveBeenCalledWith(mockUser);
      });
    });

    it('displays error toast when email verification fails', async () => {
      const verificationError = {
        code: 'auth/too-many-requests',
        message: 'Too many requests. Please try again later.',
      };
      (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUserCredential);
      (sendEmailVerification as jest.Mock).mockRejectedValue(verificationError);

      render(<SignupPage />);

      const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
      const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
      const form = emailInput.closest('form') as HTMLFormElement;

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.submit(form);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith(
          'auth/too-many-requests Too many requests. Please try again later.',
          { duration: Infinity }
        );
      });
    });

    it('still shows success message even if email verification fails', async () => {
      const verificationError = {
        code: 'auth/too-many-requests',
        message: 'Too many requests. Please try again later.',
      };
      (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUserCredential);
      (sendEmailVerification as jest.Mock).mockRejectedValue(verificationError);

      render(<SignupPage />);

      const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
      const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
      const form = emailInput.closest('form') as HTMLFormElement;

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.submit(form);

      await waitFor(() => {
        expect(screen.getByText(/Your account created successfully!/i)).toBeInTheDocument();
      });
    });
  });

  describe('Form Validation', () => {
    it('has required attributes on email and password inputs', () => {
      render(<SignupPage />);

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');

      expect(emailInput).toBeRequired();
      expect(passwordInput).toBeRequired();
    });

    it('has correct input types for validation', () => {
      render(<SignupPage />);

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');

      expect(emailInput).toHaveAttribute('type', 'email');
      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });

  describe('Edge Cases', () => {
    it('handles missing auth object gracefully', () => {
      (useFirebase as jest.Mock).mockReturnValue({
        auth: null,
      });

      render(<SignupPage />);

      const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
      const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
      const form = emailInput.closest('form') as HTMLFormElement;

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.submit(form);

      // Should not call createUserWithEmailAndPassword when auth is null
      expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
    });

    it('does not show success message initially', () => {
      render(<SignupPage />);

      expect(screen.queryByText(/Your account created successfully!/i)).not.toBeInTheDocument();
    });

    it('hides form after successful signup', async () => {
      (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUserCredential);
      (sendEmailVerification as jest.Mock).mockResolvedValue(undefined);

      render(<SignupPage />);

      const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
      const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
      const form = emailInput.closest('form') as HTMLFormElement;

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.submit(form);

      await waitFor(() => {
        expect(screen.getByText(/Your account created successfully!/i)).toBeInTheDocument();
      });

      // Form should not be visible after success
      expect(screen.queryByLabelText('Email')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Password')).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /Create Account/i })).not.toBeInTheDocument();
    });
  });
});

