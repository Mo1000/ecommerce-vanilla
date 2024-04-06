import Swal from 'sweetalert2';

export const formatTextForSwal = (text: string) => {
  return `<p class="text-[18px]">${text}</p>`;
};

export const SwalCustom = Swal.mixin({
  customClass: {
    popup: 'bg-project',
    confirmButton:
      'py-2 px-6 bg-primaryLight-500 dark:bg-primaryDark-500 hover:bg-primaryLight-700 dark:hover:bg-primaryDark-300 w-full rounded-full  hover:ease-in hover:duration-200 text-white',
    denyButton:
      'py-2 px-6 border-1 border-primaryLight-700 dark:border-primaryDark-500  border w-full rounded-full text-active-project',
  },
  buttonsStyling: false,
  animation: true,
});
