"use client";
import styles from "../auth.module.scss";
import { MdOutlineMailOutline } from "react-icons/md";
import { LuLock } from "react-icons/lu";
import { IoPerson } from "react-icons/io5";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { RegisterProps } from "@/types/auth";
import instance from "@/axios";
import Link from "next/link";

interface Country {
  name: { common: string };
  cca2: string;
}
interface CountryOption {
  label: string;
  value: string;
}

const Register = () => {
  const [countries, setCountries] = useState<CountryOption[]>([]);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    trigger,
    getValues,
  } = useForm<RegisterProps>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      country: "",
    },
  });

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      const countryOptions = response.data
        .map((country: Country) => ({
          label: country.name.common,
          value: country.cca2,
        }))
        .sort((a: { label: string }, b: { label: string }) =>
          a.label.localeCompare(b.label)
        );
      setCountries(countryOptions);
    });
  }, []);

  const handleFormSubmit = async (data: RegisterProps) => {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      country,
      file,
    } = data;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    const countryName = countries.find((c) => c.value === country)?.label;

    const formData = new FormData();
    formData.append("FirstName", firstName);
    formData.append("LastName", lastName);
    formData.append("Email", email);
    formData.append("Password", password);
    formData.append("ConfirmPassword", confirmPassword);
    formData.append("Image", file[0]);
    if (countryName) {
      formData.append("Country", countryName);
    }

    try {
      await instance.post("Account/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      router.push("/login");
      reset();
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.errors) {
        toast.error(error.response.data.errors[0] || "Failed Please Try Again");
      } else {
        toast.error("Failed Please Try Again");
      }
    }
  };

  return (
    <div className={styles.auth}>
      <div className={`${styles.form} ${styles["register-form"]}`}>
        <h2>Create your account</h2>
        <p>or</p>
        <Link href="/login" className={styles.register}>
          Sign in to your existing account
        </Link>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className={styles["form-input"]}>
            {/* First Name */}
            <div
              className={
                errors.firstName
                  ? `${styles.inputGroup} ${styles.invalid}`
                  : styles.inputGroup
              }
            >
              <label>First Name</label>
              <input
                type="text"
                placeholder="Enter First Name"
                {...register("firstName", {
                  required: "First Name is required.",
                  onChange: () => trigger("firstName"),
                })}
                onBlur={() => trigger("firstName")}
              />
              <IoPerson size={22} />
              {errors.firstName && (
                <p className={styles["error-text"]}>
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div
              className={
                errors.lastName
                  ? `${styles.inputGroup} ${styles.invalid}`
                  : styles.inputGroup
              }
            >
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Enter Last Name"
                {...register("lastName", {
                  required: "Last Name is required.",
                  onChange: () => trigger("lastName"),
                })}
                onBlur={() => trigger("lastName")}
              />
              <IoPerson size={22} />
              {errors.lastName && (
                <p className={styles["error-text"]}>
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div
              className={
                errors.email
                  ? `${styles.inputGroup} ${styles.invalid}`
                  : styles.inputGroup
              }
            >
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your Email"
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email.",
                  },
                  onChange: () => trigger("email"),
                })}
                onBlur={() => trigger("email")}
              />
              <MdOutlineMailOutline size={22} />
              {errors.email && (
                <p className={styles["error-text"]}>{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div
              className={
                errors.password
                  ? `${styles.inputGroup} ${styles.invalid}`
                  : styles.inputGroup
              }
            >
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required.",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                    message:
                      "Password must include uppercase, lowercase, number, and symbol.",
                  },
                  onChange: () => trigger("password"),
                })}
                onBlur={() => {
                  trigger("password");
                  trigger("confirmPassword");
                }}
              />
              <LuLock size={22} />
              {errors.password && (
                <p className={styles["error-text"]}>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Country */}
            <div
              className={
                errors.country
                  ? `${styles.inputGroup} ${styles.invalid}`
                  : styles.inputGroup
              }
            >
              <label htmlFor="country">Country</label>
              <select
                id="country"
                {...register("country", { required: "This Field Is Required" })}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className={styles["error-text"]}>{errors.country.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div
              className={
                errors.confirmPassword
                  ? `${styles.inputGroup} ${styles.invalid}`
                  : styles.inputGroup
              }
            >
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                {...register("confirmPassword", {
                  required: "Please confirm your password.",
                  validate: (value) =>
                    value === getValues("password") ||
                    "Passwords do not match.",
                })}
                onBlur={() => trigger("confirmPassword")}
              />
              <LuLock size={22} />
              {errors.confirmPassword && (
                <p className={styles["error-text"]}>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div
              className={
                errors.file
                  ? `${styles.inputGroup} ${styles.invalid}`
                  : styles.inputGroup
              }
            >
              <label htmlFor="file">upload Image</label>
              <input
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                {...register("file", { required: "Image is required" })}
              />

              {errors.file && (
                <p className={styles["error-text"]}>{errors.file.message}</p>
              )}
            </div>
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
