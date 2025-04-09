import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FcGoogle } from "react-icons/fc";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
         // Store the last visited URL in localStorage
        localStorage.setItem("last_visited_url", window.location.pathname);

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Google Login Button */}
                    <a
                        href={route("auth.google")}
                        className="flex items-center justify-center w-full sm:w-auto gap-3 bg-green-500 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:bg-red-600 transition-all duration-300 whitespace-nowrap"
                    >
                        <FcGoogle className="w-5 h-5" />
                        <span className="whitespace-nowrap">
                            Login with Google
                        </span>
                    </a>

                    {/* Forgot Password & Login Button */}
                    <div className="flex items-center gap-4">
                        <PrimaryButton
                            className="px-6 py-2 bg-indigo-600 whitespace-nowrap  text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md"
                            disabled={processing}
                        >
                            Log in
                        </PrimaryButton>
                    </div>
                    
                </div>
                <Link
                href={route("password.request")}
                className="text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Forgot your password?
            </Link>
            </form>
        </GuestLayout>
    );
}
