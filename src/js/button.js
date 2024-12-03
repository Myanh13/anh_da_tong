
    const button = document.querySelector('.button');
    button.addEventListener('mouseenter', () => {
        button.classList.add('hover');
        button.classList.remove('animate'); // Remove animation class on hover
    });

    button.addEventListener('mouseleave', () => {
        button.classList.remove('hover');
        button.classList.add('animate'); // Add animation class when mouse leaves
    });

    // Ensure the animation state resets immediately after the hover
    button.addEventListener('animationend', () => {
        button.classList.remove('animate');
    });




    // .button {
    //     position: relative;
    //     display: inline-block;
    //     z-index: 1;
    //     overflow: hidden;
   
    //     line-height: normal;
    //     color: #fff;
    //     background: #53624e; 
    //     border: 0;
    //     font-size: 16px;
    //     text-align: center;
    //     letter-spacing: 1px;
    
    //     outline: none !important;
    //     -webkit-transition: all 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    //     transition: all 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    // }
    // .button::before {
    //     content: '';
    //     position: absolute;
    //     top: 0;
    //     left: 0;
    //     width: 100%;
    //     height: 100%;
    //     background-color: #b99d75;
    //     transform: translateX(-100%);
    //     -webkit-transition: all 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    
    // }
    // .button.hover::before {
    //     transform: translateX(0);
    // }
    
    // .button.animate::before {
    //     animation: slide 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86); /* Adjusted slide-out duration */
    // }
    // @keyframes slide {
    //     0% {
    //         transform: translateX(0);
    //     }
    //     100% {
    //         transform: translateX(100%);
    //     }
    // }
    // .button span{
    //     width: 100%;
    //     z-index: 1;
    // }

    