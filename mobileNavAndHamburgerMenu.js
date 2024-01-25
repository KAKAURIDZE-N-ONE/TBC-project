// function updateSlider(side, pageIndex) {
//   const partnersCenterBox = document.querySelector('.partners-center-box');

//   const partnersLeftOrRightBox = document.createElement('div');
//   partnersLeftOrRightBox.classList.add('partners-right-box');

//   const partnersMobileImgs = Array.from({ length: 3 }, () =>
//     document.createElement('img')
//   ).map((image, imgIndex) => {
//     image.classList.add('partners-mobile-img');
//     partnersLeftOrRightBox.append(image);
//     if (pageIndex === 0) {
//       image.src = `./imgs/partners/${
//         imgIndex === 0
//           ? 'usaid.webp'
//           : imgIndex === 1
//           ? 'space int.webp'
//           : 'tineti.webp'
//       }`;
//       image.style.width =
//         imgIndex === 0 ? '21.9rem' : imgIndex === 1 ? '20rem' : '25rem';
//     }
//     if (pageIndex === 1) {
//       image.src = `./imgs/partners/${
//         imgIndex === 0
//           ? 'tegeta.webp'
//           : imgIndex === 1
//           ? 'spectre.webp'
//           : 'tibisi.webp'
//       }`;
//       image.style.width =
//         imgIndex === 0 ? '18rem' : imgIndex === 1 ? '13.1rem' : '22rem';
//     }
//     if (pageIndex === 2 && imgIndex === 1) {
//       image.src = './imgs/partners/ufc.webp';
//       image.style.width = '23.2rem';
//     }
//   });

//   side === 'right'
//     ? slidersContainer.append(partnersLeftOrRightBox)
//     : slidersContainer.prepend(partnersLeftOrRightBox);

//   setTimeout(function () {
//     partnersRightBox.classList.remove(
//       `partners-${side === 'right' ? side : 'left'}-box`
//     );
//     partnersRightBox.classList.add('partners-center-box');
//     partnersCenterBox.classList.remove('partners-center-box');
//     partnersCenterBox.classList.add(
//       `partners-${side === 'right' ? 'left' : side}-box`
//     );
//   }, 10);
//   setTimeout(function () {
//     partnersCenterBox.remove();
//   }, 1000);

//   draggingIsPaused = true;
//   handleTurnOnDragging();
// }
// ///////////////////////////////////////////////////////////////////////////////////////
// function slideLeftOrRight(oldValue, newValue) {
//   selectedPartnersPage = newValue < 0 ? 2 : newValue > 2 ? 0 : newValue;
//   if (newValue - oldValue > 0) {
//     updateSlider('right', selectedPartnersPage);
//   }
//   if (newValue - oldValue < 0) {
//     updateSlider('left', selectedPartnersPage);
//   }
//   updateNavDots();
// }

// function updateSlider(side, pageIndex) {
//   const partnersCenterBox = document.querySelector('.partners-center-box');

//   if (side === 'right') {
//     const partnersRightBox = document.createElement('div');
//     partnersRightBox.classList.add('partners-right-box');

//     const partnersMobileImgs = Array.from({ length: 3 }, () =>
//       document.createElement('img')
//     ).map((image, imgIndex) => {
//       image.classList.add('partners-mobile-img');
//       partnersRightBox.append(image);
//       if (pageIndex === 0) {
//         image.src = `./imgs/partners/${
//           imgIndex === 0
//             ? 'usaid.webp'
//             : imgIndex === 1
//             ? 'space int.webp'
//             : 'tineti.webp'
//         }`;
//         image.style.width =
//           imgIndex === 0 ? '21.9rem' : imgIndex === 1 ? '20rem' : '25rem';
//       }
//       if (pageIndex === 1) {
//         image.src = `./imgs/partners/${
//           imgIndex === 0
//             ? 'tegeta.webp'
//             : imgIndex === 1
//             ? 'spectre.webp'
//             : 'tibisi.webp'
//         }`;
//         image.style.width =
//           imgIndex === 0 ? '18rem' : imgIndex === 1 ? '13.1rem' : '22rem';
//       }
//       if (pageIndex === 2 && imgIndex === 1) {
//         image.src = './imgs/partners/ufc.webp';
//         image.style.width = '23.2rem';
//       }
//     });

//     slidersContainer.append(partnersRightBox);

//     setTimeout(function () {
//       partnersRightBox.classList.remove('partners-right-box');
//       partnersRightBox.classList.add('partners-center-box');
//       partnersCenterBox.classList.remove('partners-center-box');
//       partnersCenterBox.classList.add('partners-left-box');
//     }, 10);
//     setTimeout(function () {
//       partnersCenterBox.remove();
//     }, 1000);
//   }
//   if (side === 'left') {
//     const partnersLeftBox = document.createElement('div');
//     partnersLeftBox.classList.add('partners-left-box');

//     const partnersMobileImgs = Array.from({ length: 3 }, () =>
//       document.createElement('img')
//     ).map((image, imgIndex) => {
//       image.classList.add('partners-mobile-img');
//       partnersLeftBox.append(image);
//       if (pageIndex === 0) {
//         image.src = `./imgs/partners/${
//           imgIndex === 0
//             ? 'usaid.webp'
//             : imgIndex === 1
//             ? 'space int.webp'
//             : 'tineti.webp'
//         }`;
//         image.style.width =
//           imgIndex === 0 ? '21.9rem' : imgIndex === 1 ? '20rem' : '25rem';
//       }
//       if (pageIndex === 1) {
//         image.src = `./imgs/partners/${
//           imgIndex === 0
//             ? 'tegeta.webp'
//             : imgIndex === 1
//             ? 'spectre.webp'
//             : 'tibisi.webp'
//         }`;
//         image.style.width =
//           imgIndex === 0 ? '18rem' : imgIndex === 1 ? '13.1rem' : '22rem';
//       }
//       if (pageIndex === 2 && imgIndex === 1) {
//         image.src = './imgs/partners/ufc.webp';
//         image.style.width = '23.2rem';
//       }
//     });

//     slidersContainer.prepend(partnersLeftBox);

//     setTimeout(function () {
//       partnersLeftBox.classList.remove('partners-left-box');
//       partnersLeftBox.classList.add('partners-center-box');
//       partnersCenterBox.classList.remove('partners-center-box');
//       partnersCenterBox.classList.add('partners-right-box');
//     }, 10);
//     setTimeout(function () {
//       partnersCenterBox.remove();
//     }, 1000);
//   }
//   draggingIsPaused = true;
//   handleTurnOnDragging();
// }
