import cls from 'classnames'
const svgClass = (classes) => cls('inline-block', classes)

export const IconGlobe = (svgProps) => (
  <svg
    aria-labelledby={svgProps?.id}
    className={svgClass(svgProps.className)}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
  >
    {svgProps.title && <title id={svgProps?.id}>{svgProps?.title}</title>}

    <path
      fill="black"
      d="M100,175.69A75.69,75.69,0,1,1,175.69,100,75.78,75.78,0,0,1,100,175.69Zm0-141.38A65.69,65.69,0,1,0,165.69,100,65.77,65.77,0,0,0,100,34.31Z"
    />
    <path
      fill="black"
      d="M100,175.69c-19.49,0-30-39-30-75.69s10.51-75.69,30-75.69,30,39,30,75.69S119.49,175.69,100,175.69Zm0-141.38c-8.15,0-20,25.59-20,65.69,0,18.33,2.5,35.49,7,48.32,3.73,10.55,8.82,17.37,13,17.37,8.15,0,20-25.59,20-65.69,0-18.33-2.5-35.49-7-48.32C109.23,41.13,104.14,34.31,100,34.31Z"
    />
    <path
      fill="black"
      d="M170.69,105H29.31a5,5,0,0,1,0-10H170.69a5,5,0,0,1,0,10Z"
    />
    <path fill="black" d="M163.05,73H37a5,5,0,0,1,0-10h126.1a5,5,0,0,1,0,10Z" />
    <path
      fill="black"
      d="M163.05,137H37a5,5,0,0,1,0-10h126.1a5,5,0,0,1,0,10Z"
    />
  </svg>
)

export const IconExclamationBubble = (svgProps) => (
  <svg
    aria-labelledby={svgProps?.id}
    className={svgClass(svgProps.className)}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {svgProps.title && <title id={svgProps?.id}>{svgProps?.title}</title>}
    <path
      d="M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 20L4 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 14H3.17L2.58 14.59L2 15.17V2H18V14ZM9 10H11V12H9V10ZM9 4H11V8H9V4Z"
      fill="black"
    />
  </svg>
)

export const IconFacebook = (svgProps) => (
  <svg
    aria-labelledby={svgProps?.id}
    className={svgClass(svgProps.className)}
    width="35"
    height="35"
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {svgProps.title && <title id={svgProps?.id}>{svgProps?.title}</title>}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.4565 34.0974V34.0974C8.36743 34.0974 1 26.6878 1 17.5487C1 8.40957 8.36743 1 17.4565 1C26.5447 1 33.9122 8.40957 33.9122 17.5487C33.9122 26.6878 26.5447 34.0974 17.4565 34.0974Z"
      stroke="black"
      strokeWidth="1.5"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.9483 27.5506H18.9546V17.4628H21.7494L22.0477 14.0863H18.9546V12.1628C18.9546 11.3663 19.1128 11.0506 19.879 11.0506H22.0477V7.54541H19.2737C16.293 7.54541 14.9483 8.86628 14.9483 11.3932V14.0863H12.8652V17.5054H14.9483V27.5506Z"
      fill="black"
    />
  </svg>
)
export const IconYoutube = (svgProps) => (
  <svg
    aria-labelledby={svgProps?.id}
    className={svgClass(svgProps.className)}
    width="35"
    height="35"
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {svgProps.title && <title id={svgProps?.id}>{svgProps?.title}</title>}

    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.4557 34.0974V34.0974C8.36743 34.0974 1 26.6878 1 17.5487C1 8.40957 8.36743 1 17.4557 1C26.5447 1 33.9122 8.40957 33.9122 17.5487C33.9122 26.6878 26.5447 34.0974 17.4557 34.0974Z"
      stroke="black"
      strokeWidth="1.5"
    />
    <path
      d="M26.5543 13.0496C26.4452 12.6536 26.2318 12.2926 25.9354 12.0026C25.6389 11.7126 25.2699 11.5038 24.8652 11.397C23.3743 11 17.3995 11 17.3995 11C17.3995 11 11.4231 11 9.93527 11.3908C9.52964 11.4979 9.15997 11.7075 8.86345 11.9987C8.56693 12.2899 8.35403 12.6523 8.24615 13.0496C7.84668 14.5068 7.84668 17.5489 7.84668 17.5489C7.84668 17.5489 7.84668 20.5909 8.24615 22.0481C8.35499 22.4442 8.56832 22.8054 8.86478 23.0955C9.16123 23.3855 9.53039 23.5942 9.93527 23.7007C11.4246 24.0916 17.3995 24.0916 17.3995 24.0916C17.3995 24.0916 23.3758 24.0916 24.8652 23.7007C25.2699 23.5939 25.6389 23.3851 25.9354 23.0951C26.2318 22.8051 26.4452 22.4441 26.5543 22.0481C26.9522 20.5909 26.9522 17.5489 26.9522 17.5489C26.9522 17.5489 26.9475 14.5068 26.5543 13.0496Z"
      fill="#282828"
    />
    <path
      d="M15.4883 20.353V14.7458L20.4534 17.5494L15.4883 20.353Z"
      fill="white"
    />
  </svg>
)

export const IconInstagram = (svgProps) => (
  <svg
    aria-labelledby={svgProps?.id}
    className={svgClass(svgProps.className)}
    width="35"
    height="35"
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {svgProps.title && <title id={svgProps?.id}>{svgProps?.title}</title>}

    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.4557 34.0974V34.0974C8.36743 34.0974 1 26.6878 1 17.5487C1 8.40957 8.36743 1 17.4557 1C26.5447 1 33.9122 8.40957 33.9122 17.5487C33.9122 26.6878 26.5447 34.0974 17.4557 34.0974Z"
      stroke="black"
      strokeWidth="1.5"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.4551 8.47461C15.0045 8.47461 14.6984 8.48591 13.7351 8.52939C12.7752 8.57374 12.1189 8.72765 11.5448 8.952C10.9516 9.18331 10.4483 9.49374 9.94674 9.99809C9.44521 10.5024 9.1365 11.0085 8.90648 11.6059C8.68252 12.1824 8.5312 12.8416 8.48709 13.8077C8.44299 14.7755 8.43262 15.085 8.43262 17.5485C8.43262 20.0129 8.44299 20.3216 8.48709 21.2894C8.5312 22.2555 8.68252 22.9146 8.90648 23.492C9.1365 24.0885 9.44521 24.5946 9.94674 25.099C10.4483 25.6033 10.9516 25.9137 11.5448 26.145C12.1189 26.3694 12.7752 26.5233 13.7351 26.5677C14.6984 26.6111 15.0045 26.6216 17.4551 26.6216C19.9057 26.6216 20.2127 26.6111 21.176 26.5677C22.1359 26.5233 22.7922 26.3694 23.3655 26.145C23.9587 25.9137 24.4628 25.6033 24.9644 25.099C25.4659 24.5946 25.7737 24.0885 26.0046 23.492C26.2277 22.9146 26.3799 22.2555 26.424 21.2894C26.4681 20.3216 26.4785 20.0129 26.4785 17.5485C26.4785 15.085 26.4681 14.7755 26.424 13.8077C26.3799 12.8416 26.2277 12.1824 26.0046 11.6059C25.7737 11.0085 25.4659 10.5024 24.9644 9.99809C24.4628 9.49374 23.9587 9.18331 23.3655 8.952C22.7922 8.72765 22.1359 8.57374 21.176 8.52939C20.2127 8.48591 19.9057 8.47461 17.4551 8.47461ZM17.455 10.1104C19.8641 10.1104 20.1495 10.1199 21.1016 10.1625C21.981 10.2025 22.4583 10.3512 22.7765 10.4756C23.1985 10.6399 23.4986 10.8364 23.8142 11.1538C24.1307 11.4712 24.3252 11.7738 24.4895 12.1973C24.6123 12.5164 24.7593 12.9973 24.8 13.8825C24.8432 14.839 24.8527 15.1251 24.8527 17.5486C24.8527 19.9721 24.8432 20.2582 24.8 21.2147C24.7593 22.0999 24.6123 22.5808 24.4895 22.8999C24.3252 23.3234 24.1307 23.626 23.8142 23.9434C23.4986 24.2599 23.1985 24.4573 22.7765 24.6217C22.4583 24.746 21.981 24.8938 21.1016 24.9347C20.1495 24.9782 19.865 24.9869 17.455 24.9869C15.0459 24.9869 14.7606 24.9782 13.8094 24.9347C12.9299 24.8938 12.4518 24.746 12.1344 24.6217C11.7124 24.4573 11.4124 24.2599 11.0959 23.9434C10.7802 23.626 10.5857 23.3234 10.4214 22.8999C10.2986 22.5808 10.1516 22.0999 10.111 21.2147C10.0677 20.2582 10.0582 19.9721 10.0582 17.5486C10.0582 15.1251 10.0677 14.839 10.111 13.8825C10.1516 12.9973 10.2986 12.5164 10.4214 12.1973C10.5857 11.7738 10.7802 11.4712 11.0959 11.1538C11.4124 10.8364 11.7124 10.6399 12.1344 10.4756C12.4518 10.3512 12.9299 10.2025 13.8094 10.1625C14.7606 10.1199 15.0459 10.1104 17.455 10.1104Z"
      fill="black"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.4557 20.5731C15.7946 20.5731 14.4482 19.2183 14.4482 17.5479C14.4482 15.8783 15.7946 14.5244 17.4557 14.5244C19.1169 14.5244 20.4641 15.8783 20.4641 17.5479C20.4641 19.2183 19.1169 20.5731 17.4557 20.5731ZM17.4556 12.8896C14.8968 12.8896 12.8232 14.9757 12.8232 17.5479C12.8232 20.1218 14.8968 22.2079 17.4556 22.2079C20.0151 22.2079 22.0887 20.1218 22.0887 17.5479C22.0887 14.9757 20.0151 12.8896 17.4556 12.8896Z"
      fill="black"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M23.3547 12.7054C23.3547 13.3063 22.8696 13.7941 22.2721 13.7941C21.6746 13.7941 21.1895 13.3063 21.1895 12.7054C21.1895 12.1045 21.6746 11.6167 22.2721 11.6167C22.8696 11.6167 23.3547 12.1045 23.3547 12.7054Z"
      fill="black"
    />
  </svg>
)

export const IconLinkedin = (svgProps) => (
  <svg
    aria-labelledby={svgProps?.id}
    className={svgClass(svgProps.className)}
    width="35"
    height="35"
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {svgProps.title && <title id={svgProps?.id}>{svgProps?.title}</title>}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.4557 34.0974V34.0974C8.36743 34.0974 1 26.6878 1 17.5487C1 8.40957 8.36743 1 17.4557 1C26.5447 1 33.9122 8.40957 33.9122 17.5487C33.9122 26.6878 26.5447 34.0974 17.4557 34.0974Z"
      stroke="black"
      strokeWidth="1.5"
    />
    <path
      d="M26.8,25.7h-3.6v-6.8c0-.8-.3-1.3-.6-1.6-.7-.7-2.3-.5-2.9.2-.3.4-.6.8-.6,1.7v6.4h-3.6v-11.7h3.5v1.6c.1,0,0,0,.1,0,1-1.4,2.2-1.9,4-1.8,2.7.2,3.6,2,3.8,4.5v7.5h0Z"
      fill="black"
    />
    <polygon
      points="13.2 14 13.2 25.7 9.5 25.7 9.5 14.1 9.6 14 13.2 14"
      fill="black"
    />
    <path
      d="M11.3,8.2c2.9,0,2.8,4.5-.3,4.2-2.4-.3-2.4-4.2.3-4.2Z"
      fill="black"
    />
  </svg>
)

export const IconHome = (svgProps) => (
  <svg
    aria-labelledby={svgProps?.id}
    className={svgClass(svgProps.className)}
    width="17"
    height="14"
    viewBox="0 0 17 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {svgProps.title && <title id={svgProps?.id}>{svgProps?.title}</title>}

    <path
      d="M7.29412 13.4231H4.20588V8.34614H2L9.05882 1.5769L15.6765 8.34614H13.4706V13.4231H10.3824V9.19229H7.29412V13.4231Z"
      stroke="black"
    />
  </svg>
)

export const IconAngleDown = (svgProps) => (
  <svg
    aria-labelledby={svgProps?.id}
    className={svgClass(svgProps.className)}
    width="11"
    height="6"
    viewBox="0 0 11 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {svgProps.title && <title id={svgProps?.id}>{svgProps?.title}</title>}

    <path d="M10.3311 1.83871L5.32299 6L5.00847 6L0.000408195 1.83871L1.04073 -8.81717e-08L5.17783 3.3629L9.31493 -9.64378e-09L10.3311 1.83871Z" />
  </svg>
)

export const IconAngleRight = ({ className }) => (
  <svg
    preserveAspectRatio="xMidYMin slice"
    className={svgClass(className)}
    width="3"
    height="5"
    viewBox="0 0 3 5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 2.58235L0.805497 5L0 4.55882L1.8203 2.49412L0 0.435294L0.805497 0L3 2.42353V2.58235Z"
      fill="black"
    />
  </svg>
)

export const IconAngleUp = (svgProps) => (
  <svg
    aria-labelledby={svgProps?.id}
    className={svgClass(svgProps.className)}
    width="11"
    height="6"
    viewBox="0 0 11 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {svgProps.title && <title id={svgProps?.id}>{svgProps?.title}</title>}

    <path d="M0.628906 4.16129L5.63697 3.65178e-07L5.95149 3.58166e-07L10.9596 4.16129L9.91923 6L5.78213 2.6371L1.64504 6L0.628906 4.16129Z" />
  </svg>
)

export const IconCross = (svgProps) => (
  <svg
    aria-labelledby={svgProps?.id}
    className={svgClass(svgProps.className)}
    width="23"
    height="21"
    viewBox="0 0 23 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {svgProps.title && <title id={svgProps?.id}>{svgProps?.title}</title>}

    <path
      fill="black"
      d="M11.0523 12.3944L6.42824 16.6474L4.63598 14.9989L9.26001 10.746L4.62403 6.48202L6.41629 4.83358L11.0523 9.09754L15.6763 4.84457L17.4686 6.49301L12.8445 10.746L17.4566 14.988L15.6644 16.6364L11.0523 12.3944Z"
    />
  </svg>
)

export const IconCheck = (svgProps) => (
  <svg
    aria-labelledby={svgProps?.id}
    className={svgClass(svgProps.className)}
    width="14"
    height="11"
    viewBox="0 0 14 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {svgProps.title && <title id={svgProps?.id}>{svgProps?.title}</title>}

    <path d="M13 1L4.99967 9L1 4.9995" stroke="black" strokeWidth="2" />
  </svg>
)

export const IconLookingGlass = (svgProps) => (
  <svg
    aria-labelledby={svgProps?.id}
    className={svgClass(svgProps.className)}
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {svgProps.title && <title id={svgProps?.id}>{svgProps?.title}</title>}

    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.4705 6.73533C12.4705 9.90241 9.903 12.4707 6.73526 12.4707C3.56823 12.4707 1 9.90241 1 6.73533C1 3.56756 3.56823 1 6.73526 1C9.903 1 12.4705 3.56756 12.4705 6.73533Z"
      stroke="black"
      strokeWidth="2"
    />
    <path d="M10.7061 10.7059L16.0001 16" stroke="black" strokeWidth="2" />
  </svg>
)

// export const IconPDF = (svgProps) => (
//   <svg
//     aria-labelledby={svgProps?.id}
//     className={svgClass(svgProps.className)}
//     width="10"
//     height="12"
//     viewBox="0 0 10 12"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     {svgProps.title && <title id={svgProps?.id}>{svgProps?.title}</title>}

//     <path
//       d="M0.5 1C0.5 0.723858 0.723858 0.5 1 0.5H6.54007C6.68603 0.5 6.8247 0.563781 6.91969 0.674604L9.37963 3.54453C9.4573 3.63515 9.5 3.75057 9.5 3.86992V11C9.5 11.2761 9.27614 11.5 9 11.5H1C0.723858 11.5 0.5 11.2761 0.5 11V1Z"
//       stroke="black"
//     />
//     <path
//       d="M2.84863 8.86621H2.99805C3.1377 8.86621 3.24219 8.83887 3.31152 8.78418C3.38086 8.72852 3.41553 8.64795 3.41553 8.54248C3.41553 8.43604 3.38623 8.35742 3.32764 8.30664C3.27002 8.25586 3.1792 8.23047 3.05518 8.23047H2.84863V8.86621ZM3.87402 8.52637C3.87402 8.75684 3.80176 8.93311 3.65723 9.05518C3.51367 9.17725 3.30908 9.23828 3.04346 9.23828H2.84863V10H2.39453V7.8584H3.07861C3.33838 7.8584 3.53564 7.91455 3.67041 8.02686C3.80615 8.13818 3.87402 8.30469 3.87402 8.52637Z"
//       fill="black"
//     />
//     <path
//       d="M6.05518 8.90869C6.05518 9.26123 5.95459 9.53125 5.75342 9.71875C5.55322 9.90625 5.26367 10 4.88477 10H4.27832V7.8584H4.95068C5.30029 7.8584 5.57178 7.95068 5.76514 8.13525C5.9585 8.31982 6.05518 8.57764 6.05518 8.90869ZM5.5835 8.92041C5.5835 8.46045 5.38037 8.23047 4.97412 8.23047H4.73242V9.625H4.92725C5.36475 9.625 5.5835 9.39014 5.5835 8.92041Z"
//       fill="black"
//     />
//     <path
//       d="M6.9458 10H6.49902V7.8584H7.72656V8.23047H6.9458V8.78271H7.67236V9.15332H6.9458V10Z"
//       fill="black"
//     />
//     <path
//       d="M6.75 3V0.665362L9.44906 3.75H7.5C7.08579 3.75 6.75 3.41421 6.75 3Z"
//       stroke="black"
//       strokeWidth="0.5"
//     />
//   </svg>
// )

export const IconExternalSite = (svgProps) => (
  <svg
    aria-labelledby={svgProps?.id}
    className={svgClass(svgProps.className)}
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {svgProps.title && <title id={svgProps?.id}>{svgProps?.title}</title>}

    <path
      d="M8.88889 8.88889H1.11111V1.11111H5V0H1.11111C0.494444 0 0 0.5 0 1.11111V8.88889C0 9.5 0.494444 10 1.11111 10H8.88889C9.5 10 10 9.5 10 8.88889V5H8.88889V8.88889ZM6.11111 0V1.11111H8.10556L2.64444 6.57222L3.42778 7.35556L8.88889 1.89444V3.88889H10V0H6.11111Z"
      fill="black"
    />
  </svg>
)
export const IconCalendar = (svgProps) => (
  <svg
    aria-labelledby={svgProps?.id}
    className={svgClass(svgProps.className)}
    width="11"
    height="12"
    viewBox="0 0 11 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {svgProps.title && <title id={svgProps?.id}>{svgProps?.title}</title>}

    <path
      d="M9.77778 1.2H9.16667V0H7.94444V1.2H3.05556V0H1.83333V1.2H1.22222C0.543889 1.2 0.00611111 1.74 0.00611111 2.4L0 10.8C0 11.46 0.543889 12 1.22222 12H9.77778C10.45 12 11 11.46 11 10.8V2.4C11 1.74 10.45 1.2 9.77778 1.2ZM9.77778 10.8H1.22222V4.8H9.77778V10.8ZM9.77778 3.6H1.22222V2.4H9.77778V3.6ZM5.5 6.6H8.55556V9.6H5.5V6.6Z"
      fill="black"
    />
  </svg>
)
export const IconMenu = (svgProps) => (
  <svg
    aria-labelledby={svgProps?.id}
    className={svgClass(svgProps.className)}
    width="23"
    height="14"
    viewBox="0 0 23 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {svgProps.title && <title id={svgProps?.id}>{svgProps?.title}</title>}
    <path d="M0 1H22.75" stroke="black" strokeWidth="2" />
    <path d="M0 7H23" stroke="black" strokeWidth="2" />
    <path d="M0 13H23" stroke="black" strokeWidth="2" />
  </svg>
)

export const IconMapMarker = (svgProps) => (
  <svg
    aria-labelledby={svgProps?.id}
    className={svgClass(svgProps.className)}
    width="36"
    height="42"
    viewBox="0 0 36 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {svgProps.title && <title id={svgProps?.id}>{svgProps?.title}</title>}

    <path
      d="M18 21C15.525 21 13.5 19.11 13.5 16.8C13.5 14.49 15.525 12.6 18 12.6C20.475 12.6 22.5 14.49 22.5 16.8C22.5 19.11 20.475 21 18 21ZM31.5 17.22C31.5 9.597 25.5375 4.2 18 4.2C10.4625 4.2 4.5 9.597 4.5 17.22C4.5 22.134 8.8875 28.644 18 36.414C27.1125 28.644 31.5 22.134 31.5 17.22ZM18 0C27.45 0 36 6.762 36 17.22C36 24.192 29.9925 32.445 18 42C6.0075 32.445 0 24.192 0 17.22C0 6.762 8.55 0 18 0Z"
      fill="black"
    />
  </svg>
)

export const IconExclamationCircle = (svgProps) => (
  <svg
    width="35"
    height="35"
    viewBox="0 0 35 35"
    fill="none"
    aria-labelledby={svgProps?.id}
    className={svgClass(svgProps.className)}
    xmlns="http://www.w3.org/2000/svg"
  >
    {svgProps.title && <title id={svgProps?.id}>{svgProps?.title}</title>}
    <path d="M17.5 0C7.84 0 0 7.84 0 17.5C0 27.16 7.84 35 17.5 35C27.16 35 35 27.16 35 17.5C35 7.84 27.16 0 17.5 0ZM19.25 26.25H15.75V22.75H19.25V26.25ZM19.25 19.25H15.75V8.75H19.25V19.25Z" />
  </svg>
)
const iconMap = new Map()

iconMap.set('facebook', [IconFacebook, 'm'])
iconMap.set('instagram', [IconInstagram, 'm'])
iconMap.set('youtube', [IconYoutube, 'm'])
iconMap.set('linkedin', [IconLinkedin, 'm'])
iconMap.set('angledown', [IconAngleDown, 's'])
iconMap.set('angleright', [IconAngleRight, 'xs'])
iconMap.set('angleup', [IconAngleUp, 's'])
iconMap.set('cross', [IconCross, 's'])
iconMap.set('check', [IconCheck, 's'])
iconMap.set('external', [IconExternalSite, 's'])
iconMap.set('home', [IconHome, 's'])
iconMap.set('search', [IconLookingGlass, 's'])
// iconMap.set('pdf', [IconPDF, 's'])
iconMap.set('calendar', [IconCalendar, 's'])
iconMap.set('menu', [IconMenu, 's'])

const Icon = ({ icon, title, ariaHidden, className }) => {
  const [SelectedIcon] = iconMap.get(icon)
  const id = icon
  const svgProps = { title, id, className }

  return (
    <i
      aria-hidden={ariaHidden}
      className={cls('inline-block text-center', {
        // 'h-6 w-6 ': size === 's',
        // 'h-9 w-9': size === 'm',
      })}
    >
      <SelectedIcon {...svgProps} />
    </i>
  )
}

export const IconCircleArrowRight = (svgProps) => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    aria-labelledby={svgProps?.id}
    className={svgClass(svgProps.className)}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle r="14.5" transform="matrix(-1 0 0 1 15 15)" stroke="black" />
    <path
      d="M19.1191 14.8877L15.1338 10L12.7812 11.2783L15.7783 15.0166L12.7812 18.7549L15.1338 20.0332L19.1191 15.167V14.8877Z"
      fill="black"
    />
  </svg>
)

export default Icon
