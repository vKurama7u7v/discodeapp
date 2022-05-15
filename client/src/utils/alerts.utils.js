import Swal from "sweetalert2/dist/sweetalert2.js";

export const StatusAlert = (title, message, icon) => {
  Swal.fire(`${title}`, `${message}`, `${icon}`);
};

export const ToastNotification = (title, icon) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    popup: "swal2-hide",
    icon: `${icon}`,
    title: `${title}`,
  });
};
