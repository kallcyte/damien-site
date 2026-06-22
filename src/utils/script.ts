import type { Alpine } from "alpinejs";
import JustValidate from "just-validate";

export default function (Alpine: Alpine) {
  Alpine.data("formHandler", () => ({
    formData: {
      firstName: "",
      lastName: "",
      jobTitle: "",
      companyName: "",
      country: "",
      phoneNumber: "",
      corporateEmail: "",
      message: "",
    },

    init() {
      const validator = new JustValidate(this.$refs.form, {
        errorLabelCssClass: ["mt-1", "text-sm", "text-red-500"],
      });

      validator
        .addField("#firstName", [
          {
            rule: "required",
            errorMessage: "First name is required",
          },
        ])
        .addField("#lastName", [
          {
            rule: "required",
            errorMessage: "Last name is required",
          },
        ])
        .addField("#jobTitle", [
          {
            rule: "required",
            errorMessage: "Job title is required",
          },
        ])
        .addField("#companyName", [
          {
            rule: "required",
            errorMessage: "Company name is required",
          },
        ])
        .addField("#country", [
          {
            rule: "required",
            errorMessage: "Country is required",
          },
        ])
        .addField("#phoneNumber", [
          {
            rule: "required",
            errorMessage: "Phone number is required",
          },
        ])
        .addField("#corporateEmail", [
          {
            rule: "required",
            errorMessage: "Corporate email is required",
          },
          {
            rule: "email",
            errorMessage: "Please enter a valid email",
          },
        ])
        .addField("#message", [
          {
            rule: "required",
            errorMessage: "Message is required",
          },
        ])
        .onSuccess(async (event: Event) => {
          event.preventDefault();
          console.log("Form Data:", this.formData);
          // const response = await fetch("/api/contact", {
          //   method: "POST",
          //   headers: { "Content-Type": "application/json" },
          //   body: JSON.stringify(this.formData),
          // });
          this.resetForm();
        });
    },

    resetForm() {
      this.formData = {
        firstName: "",
        lastName: "",
        jobTitle: "",
        companyName: "",
        country: "",
        phoneNumber: "",
        corporateEmail: "",
        message: "",
      };
    },
  }));
}
