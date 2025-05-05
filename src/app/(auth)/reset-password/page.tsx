
"use client"
import { useForm } from "react-hook-form";
import { use,  useState } from "react";
import styles from "../auth.module.scss"


import { toast } from "sonner";
import { LuLock } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import instance from "@/axios";
import { ResetPasswordProps } from "@/types/auth";




const ResetPassword = ({searchParams}:  {searchParams: Promise<{ token : string}>}) => {
    const {token} = use(searchParams)
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onsubmit = async (data:ResetPasswordProps) => {
    setIsSubmitting(true);
    try {
      await instance.post("Account/reset-password", {
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        token: token,
      });
      toast.success("Password reset successfully!");
    } catch {
      toast.error("Please Try Again");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.auth}>
      <div className={styles.form}>
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className={styles["form-input"]}>
            {/* Email Input */}
            <div
              className={`${styles.inputGroup} ${
                errors.email ? styles.invalid : ""
              }`}
            >
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter Your Email"
                id="email"
                {...register("email", {
                  required: "This Field Is Required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email",
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

            {/* Password Input */}
            <div
              className={`${styles.inputGroup} ${
                errors.password ? styles.invalid : ""
              }`}
            >
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "This Field Is Required",
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

            {/* Confirm Password Input */}
            <div
              className={`${styles.inputGroup} ${
                errors.confirmPassword ? styles.invalid : ""
              }`}
            >
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm password"
                {...register("confirmPassword", {
                  required: "This Field Is Required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                  onChange: () => trigger("confirmPassword"),
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
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
