import { Link } from "react-router-dom";
import { Code2, Users, MessageCircle, Shield, Zap, Globe } from "lucide-react";
import { useSelector } from "react-redux";

const LandingPage = () => {
    const user = useSelector((store) => store.user);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="hero min-h-[80vh] bg-base-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 z-0"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                <div className="hero-content text-center z-10">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-7xl font-extrabold font-outfit tracking-tight mb-6">
                            Connect. Code. <br />
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Create Together.
                            </span>
                        </h1>
                        <p className="py-6 text-xl text-base-content/70 mb-8 max-w-2xl mx-auto">
                            DevAlliance is the ultimate platform for developers to find peers,
                            collaborate on projects, and build meaningful professional connections
                            in a real-time, interactive environment.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {user ? (
                                <Link to="/getUserFeed" className="btn btn-primary btn-lg rounded-full px-8 shadow-lg shadow-primary/30 hover:scale-105 transition-transform">
                                    Go to Feed
                                </Link>
                            ) : (
                                <>
                                    <Link to="/signup" className="btn btn-primary btn-lg rounded-full px-8 shadow-lg shadow-primary/30 hover:scale-105 transition-transform">
                                        Get Started
                                    </Link>
                                    <Link to="/login" className="btn btn-outline btn-lg rounded-full px-8 hover:bg-base-200 hover:scale-105 transition-transform">
                                        Login
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-24 bg-base-200/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold font-outfit mb-4">Why DevAlliance?</h2>
                        <p className="text-base-content/60 text-lg">Everything you need to grow your developer network</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Users className="w-8 h-8 text-primary" />}
                            title="Smart Matching"
                            description="Find developers who match your skills and interests exactly."
                        />
                        <FeatureCard
                            icon={<MessageCircle className="w-8 h-8 text-secondary" />}
                            title="Real-time Chat"
                            description="Instantly connect and collaborate with your matches via live messaging."
                        />
                        <FeatureCard
                            icon={<Shield className="w-8 h-8 text-accent" />}
                            title="Verified Profiles"
                            description="Connect with confidence knowing you're talking to real developers."
                        />
                    </div>
                </div>
            </div>

            {/* About / Stats Section */}
            <div className="py-24 bg-base-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1">
                            <h2 className="text-4xl font-bold font-outfit mb-6">Built for Developers, by Developers</h2>
                            <p className="text-lg text-base-content/70 mb-6">
                                We understand the struggle of finding the right coding partner.
                                Whether you're looking for a hackathon teammate, a mentor, or a co-founder,
                                DevAlliance bridges the gap.
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                <StatItem label="Active Users" value="2k+" />
                                <StatItem label="Connections" value="50k+" />
                            </div>
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary opacity-20 blur-3xl rounded-full"></div>
                                <Globe className="w-64 h-64 text-base-content/10 relative z-10 animate-spin-slow" />
                                <Code2 className="w-32 h-32 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            {!user && (
                <div className="py-24 bg-gradient-to-r from-primary/10 to-secondary/10">
                    <div className="max-w-4xl mx-auto text-center px-4">
                        <h2 className="text-4xl font-bold font-outfit mb-6">Ready to expand your network?</h2>
                        <p className="text-xl text-base-content/70 mb-8">
                            Join thousands of developers asking questions, sharing knowledge, and building the future.
                        </p>
                        <Link to="/signup" className="btn btn-primary btn-lg rounded-full px-12 shadow-xl shadow-primary/30 hover:scale-105 transition-transform">
                            Join Now - It's Free
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-base-200">
        <div className="card-body items-center text-center">
            <div className="p-4 rounded-full bg-base-200 mb-4">
                {icon}
            </div>
            <h3 className="card-title text-xl mb-2">{title}</h3>
            <p className="text-base-content/60">{description}</p>
        </div>
    </div>
);

const StatItem = ({ label, value }) => (
    <div className="bg-base-200/50 p-6 rounded-2xl text-center">
        <div className="text-3xl font-bold text-primary mb-1">{value}</div>
        <div className="text-sm font-medium text-base-content/60 uppercase tracking-wide">{label}</div>
    </div>
);

export default LandingPage;
