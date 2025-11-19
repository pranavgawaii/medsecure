import React from 'react';
import { SignInButton, SignUpButton } from '@clerk/clerk-react';
import { ThemeToggle } from './ThemeToggle';

export const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-white transition-colors duration-300">
            <header className="p-4 flex justify-end">
                <ThemeToggle />
            </header>
            <main className="flex-grow flex flex-col items-center justify-center px-4">
                <div className="text-center max-w-2xl mx-auto">
                    <h1 className="text-5xl font-bold mb-6 tracking-tight">
                        Welcome to <span className="text-blue-600 dark:text-blue-400">ClerkApp</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
                        A minimal, secure, and beautiful starting point for your next big idea.
                        Authentication powered by Clerk.
                    </p>

                    <div className="flex gap-4 justify-center">
                        <SignInButton mode="modal">
                            <button className="px-6 py-3 rounded-lg bg-black dark:bg-white text-white dark:text-black font-medium hover:opacity-90 transition-opacity">
                                Sign In
                            </button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <button className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                Sign Up
                            </button>
                        </SignUpButton>
                    </div>
                </div>
            </main>
            <footer className="p-6 text-center text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} ClerkApp. All rights reserved.
            </footer>
        </div>
    );
};
