import React from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';
import { ThemeToggle } from './ThemeToggle';

export const HomePage: React.FC = () => {
    const { user } = useUser();

    return (
        <div className="min-h-screen bg-white dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-white transition-colors duration-300">
            <nav className="border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex-shrink-0 font-bold text-xl">
                            ClerkApp
                        </div>
                        <div className="flex items-center gap-4">
                            <ThemeToggle />
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 shadow-sm">
                    <h2 className="text-3xl font-bold mb-4">
                        Welcome back, {user?.firstName || 'User'}!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        You are successfully signed in. This is your protected dashboard.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                                <h3 className="font-semibold mb-2">Dashboard Item {item}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Placeholder content for your dashboard widgets.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};
