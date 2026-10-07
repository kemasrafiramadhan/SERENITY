// ========================================
// SERENITY - MAIN JAVASCRIPT
// E-COMMERCE PHASE 1
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    initNavbar();
    initMobileMenu();
    initRevealAnimation();
    initCart();
    initCheckout();
});


// ========================================
// PRODUCT DATA
// ========================================

const products = {

    "signature-tee": {
        id: "signature-tee",
        name: "SERENITY SIGNATURE TEE",
        price: 199000,
        category: "ESSENTIAL COLLECTION",
        description:
            "A contemporary everyday essential designed with a clean silhouette, comfortable fit, and distinctive SERENITY identity.",
        images: [
            "images/products/serenity-front.jpg",
            "images/products/serenity-back.jpg"
        ]
    },

    "back-graphic": {
        id: "back-graphic",
        name: "SIGNATURE BACK GRAPHIC",
        price: 249000,
        category: "STATEMENT COLLECTION",
        description:
            "A statement piece featuring the signature SERENITY back graphic, created for those who choose their own identity.",
        images: [
            "images/products/serenity-back.jpg",
            "images/products/serenity-front.jpg"
        ]
    }

};


// ========================================
// STATE
// ========================================

let cart = [];

let currentProduct = null;

let currentImageIndex = 0;

let selectedSize = "";

let productQuantity = 1;


// ========================================
// DOM ELEMENTS
// ========================================

const productModal =
    document.getElementById("productModal");

const cartModal =
    document.getElementById("cartModal");

const checkoutModal =
    document.getElementById("checkoutModal");

const orderSuccessModal =
    document.getElementById("orderSuccessModal");


const modalProductImage =
    document.getElementById("modalProductImage");

const modalProductCategory =
    document.getElementById("modalProductCategory");

const modalProductName =
    document.getElementById("modalProductName");

const modalProductPrice =
    document.getElementById("modalProductPrice");

const modalProductDescription =
    document.getElementById("modalProductDescription");


const selectedSizeLabel =
    document.getElementById("selectedSizeLabel");

const productQuantityInput =
    document.getElementById("productQuantity");


const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const cartCount =
    document.getElementById("cartCount");


// ========================================
// NAVBAR
// ========================================

function initNavbar() {

    const navbar =
        document.getElementById("navbar");

    if (!navbar) return;


    function updateNavbar() {

        if (window.scrollY > 30) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }


    updateNavbar();

    window.addEventListener(
        "scroll",
        updateNavbar
    );

}


// ========================================
// MOBILE MENU
// ========================================

function initMobileMenu() {

    const menuToggle =
        document.getElementById("menuToggle");

    const navMenu =
        document.getElementById("navMenu");


    if (!menuToggle || !navMenu) return;


    menuToggle.addEventListener(
        "click",
        () => {

            menuToggle.classList.toggle(
                "active"
            );

            navMenu.classList.toggle(
                "active"
            );

            document.body.classList.toggle(
                "menu-open"
            );

        }
    );


    const navLinks =
        navMenu.querySelectorAll(
            ".nav-link"
        );


    navLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                menuToggle.classList.remove(
                    "active"
                );

                navMenu.classList.remove(
                    "active"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            }
        );

    });

}


// ========================================
// ACTIVE NAVIGATION
// ========================================

function updateActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const links =
        document.querySelectorAll(
            ".nav-link"
        );


    if (
        !sections.length ||
        !links.length
    ) {
        return;
    }


    let currentSection = "";


    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 180;


        if (
            window.scrollY >=
            sectionTop
        ) {

            currentSection =
                section.getAttribute(
                    "id"
                );

        }

    });


    links.forEach((link) => {

        link.classList.remove(
            "active"
        );


        const href =
            link.getAttribute(
                "href"
            );


        if (
            href ===
            `#${currentSection}`
        ) {

            link.classList.add(
                "active"
            );

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


// ========================================
// SCROLL REVEAL
// ========================================

function initRevealAnimation() {

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (!revealElements.length) {
        return;
    }


    if (
        !(
            "IntersectionObserver"
            in window
        )
    ) {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "visible"
                );

            }
        );

        return;
    }


    const observer =
        new IntersectionObserver(
            (entries, obs) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            obs.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        (element) => {

            observer.observe(element);

        }
    );

}


// ========================================
// FORMAT PRICE
// ========================================

function formatPrice(price) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }
    ).format(price);

}


// ========================================
// PRODUCT MODAL
// ========================================

function openProduct(productId) {

    const product =
        products[productId];


    if (
        !product ||
        !productModal
    ) {
        return;
    }


    currentProduct =
        product;

    currentImageIndex = 0;

    selectedSize = "";

    productQuantity = 1;


    if (modalProductCategory) {

        modalProductCategory.textContent =
            product.category;

    }


    if (modalProductName) {

        modalProductName.textContent =
            product.name;

    }


    if (modalProductPrice) {

        modalProductPrice.textContent =
            formatPrice(
                product.price
            );

    }


    if (modalProductDescription) {

        modalProductDescription.textContent =
            product.description;

    }


    if (productQuantityInput) {

        productQuantityInput.textContent =
            "1";

    }


    if (selectedSizeLabel) {

        selectedSizeLabel.textContent =
            "Select size";

    }


    resetSizeButtons();

    setupGallery();


    productModal.classList.add(
        "active"
    );

    document.body.classList.add(
        "modal-open"
    );

}


window.openProduct =
    openProduct;


// ========================================
// CLOSE PRODUCT
// ========================================

function closeProduct() {

    if (!productModal) return;


    productModal.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "modal-open"
    );


    currentProduct = null;

    selectedSize = "";

    productQuantity = 1;

}


window.closeProduct =
    closeProduct;


// ========================================
// PRODUCT GALLERY
// ========================================

function setupGallery() {

    if (
        !modalProductImage ||
        !currentProduct
    ) {
        return;
    }


    const images =
        currentProduct.images || [];


    if (!images.length) {
        return;
    }


    modalProductImage.src =
        images[currentImageIndex];


    modalProductImage.alt =
        currentProduct.name;


    const galleryContainer =
        modalProductImage.closest(
            ".product-modal-image"
        ) ||
        modalProductImage.parentElement;


    if (!galleryContainer) {
        return;
    }


    let previousButton =
        galleryContainer.querySelector(
            ".gallery-prev"
        );


    let nextButton =
        galleryContainer.querySelector(
            ".gallery-next"
        );


    let dotsContainer =
        galleryContainer.querySelector(
            ".gallery-dots"
        );


    if (images.length > 1) {

        if (!previousButton) {

            previousButton =
                document.createElement(
                    "button"
                );

            previousButton.className =
                "gallery-arrow gallery-prev";

            previousButton.type =
                "button";

            previousButton.setAttribute(
                "aria-label",
                "Previous image"
            );

            previousButton.innerHTML =
                "&#10094;";

            galleryContainer.appendChild(
                previousButton
            );

        }


        if (!nextButton) {

            nextButton =
                document.createElement(
                    "button"
                );

            nextButton.className =
                "gallery-arrow gallery-next";

            nextButton.type =
                "button";

            nextButton.setAttribute(
                "aria-label",
                "Next image"
            );

            nextButton.innerHTML =
                "&#10095;";

            galleryContainer.appendChild(
                nextButton
            );

        }


        if (!dotsContainer) {

            dotsContainer =
                document.createElement(
                    "div"
                );

            dotsContainer.className =
                "gallery-dots";

            galleryContainer.appendChild(
                dotsContainer
            );

        }


        previousButton.onclick =
            () => {
                changeProductImage(-1);
            };


        nextButton.onclick =
            () => {
                changeProductImage(1);
            };


        renderGalleryDots(
            dotsContainer
        );

    }

}


// ========================================
// CHANGE PRODUCT IMAGE
// ========================================

function changeProductImage(
    direction
) {

    if (!currentProduct) return;


    const images =
        currentProduct.images || [];


    if (images.length <= 1) {
        return;
    }


    currentImageIndex +=
        direction;


    if (
        currentImageIndex < 0
    ) {

        currentImageIndex =
            images.length - 1;

    }


    if (
        currentImageIndex >=
        images.length
    ) {

        currentImageIndex = 0;

    }


    updateGalleryImage();

}


window.changeProductImage =
    changeProductImage;


// ========================================
// UPDATE GALLERY IMAGE
// ========================================

function updateGalleryImage() {

    if (
        !currentProduct ||
        !modalProductImage
    ) {
        return;
    }


    const images =
        currentProduct.images || [];


    if (
        !images[currentImageIndex]
    ) {
        return;
    }


    modalProductImage.src =
        images[currentImageIndex];


    modalProductImage.alt =
        `${currentProduct.name} - View ${
            currentImageIndex + 1
        }`;


    const galleryContainer =
        modalProductImage.parentElement;


    const dotsContainer =
        galleryContainer.querySelector(
            ".gallery-dots"
        );


    if (dotsContainer) {

        updateGalleryDots(
            dotsContainer
        );

    }

}


// ========================================
// GALLERY DOTS
// ========================================

function renderGalleryDots(
    container
) {

    if (!currentProduct) {
        return;
    }


    const images =
        currentProduct.images || [];


    container.innerHTML = "";


    images.forEach(
        (_, index) => {

            const dot =
                document.createElement(
                    "button"
                );


            dot.type =
                "button";

            dot.className =
                "gallery-dot";


            dot.setAttribute(
                "aria-label",
                `View image ${index + 1}`
            );


            dot.addEventListener(
                "click",
                () => {

                    currentImageIndex =
                        index;

                    updateGalleryImage();

                }
            );


            container.appendChild(
                dot
            );

        }
    );


    updateGalleryDots(
        container
    );

}


function updateGalleryDots(
    container
) {

    const dots =
        container.querySelectorAll(
            ".gallery-dot"
        );


    dots.forEach(
        (dot, index) => {

            dot.classList.toggle(
                "active",
                index ===
                    currentImageIndex
            );

        }
    );

}


// ========================================
// SIZE
// ========================================

function selectSize(
    size,
    button
) {

    selectedSize =
        size;


    if (selectedSizeLabel) {

        selectedSizeLabel.textContent =
            `Size: ${size}`;

    }


    document
        .querySelectorAll(
            ".size-button"
        )
        .forEach(
            (item) => {

                item.classList.remove(
                    "active"
                );

            }
        );


    if (button) {

        button.classList.add(
            "active"
        );

    }

}


window.selectSize =
    selectSize;


// ========================================
// RESET SIZE
// ========================================

function resetSizeButtons() {

    document
        .querySelectorAll(
            ".size-button"
        )
        .forEach(
            (button) => {

                button.classList.remove(
                    "active"
                );

            }
        );

}


// ========================================
// QUANTITY
// ========================================

function changeQuantity(
    amount
) {

    let quantity =
        productQuantity +
        amount;


    if (quantity < 1) {
        quantity = 1;
    }


    if (quantity > 10) {
        quantity = 10;
    }


    productQuantity =
        quantity;


    if (productQuantityInput) {

        productQuantityInput.textContent =
            productQuantity;

    }

}


window.changeQuantity =
    changeQuantity;


// ========================================
// ADD TO BAG
// ========================================

function addToCart() {

    if (!currentProduct) {
        return;
    }


    if (!selectedSize) {

        alert(
            "Please select a size first."
        );

        return;
    }


    const existingItem =
        cart.find(
            (item) =>
                item.id ===
                    currentProduct.id &&
                item.size ===
                    selectedSize
        );


    if (existingItem) {

        existingItem.quantity =
            Math.min(
                existingItem.quantity +
                    productQuantity,
                10
            );

    } else {

        cart.push({

            id:
                currentProduct.id,

            name:
                currentProduct.name,

            price:
                currentProduct.price,

            image:
                currentProduct.images[0],

            size:
                selectedSize,

            quantity:
                productQuantity

        });

    }


    saveCart();

    updateCartCount();

    renderCart();


    closeProduct();

    openCart();

}


window.addToCart =
    addToCart;


// ========================================
// CART STORAGE
// ========================================

function loadCart() {

    try {

        const savedCart =
            localStorage.getItem(
                "serenityCart"
            );


        if (!savedCart) {

            cart = [];

            return;

        }


        const parsedCart =
            JSON.parse(
                savedCart
            );


        if (
            !Array.isArray(
                parsedCart
            )
        ) {

            cart = [];

            return;

        }


        cart =
            parsedCart.map(
                (item) => ({

                    id:
                        item.id ||
                        item.productId,

                    name:
                        item.name ||
                        "SERENITY PRODUCT",

                    price:
                        Number(
                            item.price
                        ) || 0,

                    image:
                        item.image ||
                        "",

                    size:
                        item.size ||
                        "S",

                    quantity:
                        Math.max(
                            1,
                            Math.min(
                                Number(
                                    item.quantity
                                ) || 1,
                                10
                            )
                        )

                })
            );


    } catch (error) {

        console.error(
            "Unable to load cart:",
            error
        );

        cart = [];

    }

}


// ========================================
// SAVE CART
// ========================================

function saveCart() {

    localStorage.setItem(
        "serenityCart",
        JSON.stringify(
            cart
        )
    );

}


// ========================================
// CART COUNT
// ========================================

function updateCartCount() {

    if (!cartCount) {
        return;
    }


    const totalQuantity =
        cart.reduce(
            (total, item) =>
                total +
                Number(
                    item.quantity || 0
                ),
            0
        );


    cartCount.textContent =
        totalQuantity;

}


// ========================================
// OPEN CART
// ========================================

function openCart() {

    if (!cartModal) {
        return;
    }


    renderCart();


    cartModal.classList.add(
        "active"
    );


    document.body.classList.add(
        "modal-open"
    );

}


window.openCart =
    openCart;


// ========================================
// CLOSE CART
// ========================================

function closeCart() {

    if (!cartModal) {
        return;
    }


    cartModal.classList.remove(
        "active"
    );


    document.body.classList.remove(
        "modal-open"
    );

}


window.closeCart =
    closeCart;


// ========================================
// RENDER CART
// ========================================

function renderCart() {

    if (!cartItems) {
        return;
    }


    if (!cart.length) {

        cartItems.innerHTML = `

            <div class="cart-empty">

                <p>
                    Your bag is empty.
                </p>

                <button
                    type="button"
                    onclick="closeCart()"
                >
                    Continue Shopping
                </button>

            </div>

        `;


        if (cartTotal) {

            cartTotal.textContent =
                formatPrice(0);

        }


        return;

    }


    cartItems.innerHTML =
        "";


    let total = 0;


    cart.forEach(
        (item, index) => {

            const quantity =
                Number(
                    item.quantity
                ) || 1;


            const price =
                Number(
                    item.price
                ) || 0;


            const subtotal =
                price * quantity;


            total +=
                subtotal;


            const cartItem =
                document.createElement(
                    "div"
                );


            cartItem.className =
                "cart-item";


            cartItem.innerHTML = `

                <div class="cart-item-image">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                </div>


                <div class="cart-item-info">

                    <h4>
                        ${item.name}
                    </h4>


                    <p>
                        Size: ${item.size}
                    </p>


                    <p>
                        ${formatPrice(price)}
                    </p>


                    <div class="cart-item-bottom">

                        <span>
                            Qty: ${quantity}
                        </span>


                        <button
                            type="button"
                            class="cart-remove"
                            onclick="removeFromCart(${index})"
                        >
                            Remove
                        </button>

                    </div>

                </div>

            `;


            cartItems.appendChild(
                cartItem
            );

        }
    );


    if (cartTotal) {

        cartTotal.textContent =
            formatPrice(
                total
            );

    }

}


// ========================================
// REMOVE CART ITEM
// ========================================

function removeFromCart(
    index
) {

    if (
        index < 0 ||
        index >= cart.length
    ) {
        return;
    }


    cart.splice(
        index,
        1
    );


    saveCart();

    updateCartCount();

    renderCart();

}


window.removeFromCart =
    removeFromCart;


// ========================================================
// CHECKOUT SYSTEM
// ========================================================


// ========================================
// INIT CHECKOUT
// ========================================

function initCheckout() {

    if (!checkoutModal) {
        return;
    }


    const customerName =
        document.getElementById(
            "customerName"
        );


    if (customerName) {

        customerName.addEventListener(
            "input",
            clearFieldError
        );

    }

}


// ========================================
// OPEN CHECKOUT
// ========================================

function goToCheckout() {

    if (!cart.length) {

        alert(
            "Your shopping bag is empty."
        );

        return;
    }


    closeCart();


    renderCheckout();


    if (checkoutModal) {

        checkoutModal.classList.add(
            "active"
        );

        checkoutModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );

    }

}


window.goToCheckout =
    goToCheckout;


// ========================================
// CLOSE CHECKOUT
// ========================================

function closeCheckout() {

    if (!checkoutModal) {
        return;
    }


    checkoutModal.classList.remove(
        "active"
    );


    checkoutModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-open"
    );

}


window.closeCheckout =
    closeCheckout;


// ========================================
// RENDER CHECKOUT
// ========================================

function renderCheckout() {

    const checkoutOrderItems =
        document.getElementById(
            "checkoutOrderItems"
        );


    const checkoutSubtotal =
        document.getElementById(
            "checkoutSubtotal"
        );


    const checkoutTotal =
        document.getElementById(
            "checkoutTotal"
        );


    if (!checkoutOrderItems) {
        return;
    }


    checkoutOrderItems.innerHTML =
        "";


    let total = 0;


    cart.forEach(
        (item) => {

            const quantity =
                Number(
                    item.quantity
                ) || 1;


            const price =
                Number(
                    item.price
                ) || 0;


            const subtotal =
                price * quantity;


            total +=
                subtotal;


            const orderItem =
                document.createElement(
                    "div"
                );


            orderItem.className =
                "checkout-order-item";


            orderItem.innerHTML = `

                <div class="checkout-order-image">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                </div>


                <div class="checkout-order-info">

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        Size: ${item.size}
                    </p>

                    <p>
                        Quantity: ${quantity}
                    </p>

                </div>


                <div class="checkout-order-price">

                    ${formatPrice(
                        subtotal
                    )}

                </div>

            `;


            checkoutOrderItems.appendChild(
                orderItem
            );

        }
    );


    if (checkoutSubtotal) {

        checkoutSubtotal.textContent =
            formatPrice(
                total
            );

    }


    if (checkoutTotal) {

        checkoutTotal.textContent =
            formatPrice(
                total
            );

    }

}


// ========================================
// FORM VALIDATION
// ========================================

function validateCheckoutForm() {

    let valid = true;


    clearAllCheckoutErrors();


    const name =
        document
            .getElementById(
                "customerName"
            )
            ?.value.trim();


    const phone =
        document
            .getElementById(
                "customerPhone"
            )
            ?.value.trim();


    const email =
        document
            .getElementById(
                "customerEmail"
            )
            ?.value.trim();


    const address =
        document
            .getElementById(
                "customerAddress"
            )
            ?.value.trim();


    const agreement =
        document.getElementById(
            "paymentAgreement"
        )?.checked;


    // NAME

    if (!name) {

        showFieldError(
            "customerNameError",
            "Please enter your full name."
        );

        valid = false;

    }


    // PHONE

    if (!phone) {

        showFieldError(
            "customerPhoneError",
            "Please enter your WhatsApp number."
        );

        valid = false;

    } else if (
        !/^[0-9+\-\s]{9,16}$/.test(
            phone
        )
    ) {

        showFieldError(
            "customerPhoneError",
            "Please enter a valid WhatsApp number."
        );

        valid = false;

    }


    // EMAIL

    if (!email) {

        showFieldError(
            "customerEmailError",
            "Please enter your email address."
        );

        valid = false;

    } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            email
        )
    ) {

        showFieldError(
            "customerEmailError",
            "Please enter a valid email address."
        );

        valid = false;

    }


    // ADDRESS

    if (!address) {

        showFieldError(
            "customerAddressError",
            "Please enter your shipping address."
        );

        valid = false;

    }


    // AGREEMENT

    if (!agreement) {

        showFieldError(
            "paymentAgreementError",
            "Please confirm the information before placing your order."
        );

        valid = false;

    }


    return valid;

}


// ========================================
// SHOW FIELD ERROR
// ========================================

function showFieldError(
    elementId,
    message
) {

    const element =
        document.getElementById(
            elementId
        );


    if (element) {

        element.textContent =
            message;

    }

}


// ========================================
// CLEAR FIELD ERROR
// ========================================

function clearFieldError() {

    if (
        this &&
        this.id
    ) {

        const errorElement =
            document.getElementById(
                `${this.id}Error`
            );


        if (errorElement) {

            errorElement.textContent =
                "";

        }

    }

}


// ========================================
// CLEAR ALL ERRORS
// ========================================

function clearAllCheckoutErrors() {

    document
        .querySelectorAll(
            ".form-error"
        )
        .forEach(
            (element) => {

                element.textContent =
                    "";

            }
        );

}


// ========================================
// PLACE ORDER
// ========================================

function placeOrder() {

    if (!cart.length) {

        alert(
            "Your shopping bag is empty."
        );

        return;
    }


    const isValid =
        validateCheckoutForm();


    if (!isValid) {

        const firstError =
            document.querySelector(
                ".form-error:not(:empty)"
            );


        if (firstError) {

            firstError.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }


        return;

    }


    const orderNumber =
        generateOrderNumber();


    const orderNumberElement =
        document.getElementById(
            "orderNumber"
        );


    if (orderNumberElement) {

        orderNumberElement.textContent =
            orderNumber;

    }


    const customerData = {

        orderNumber:
            orderNumber,

        name:
            document.getElementById(
                "customerName"
            )?.value.trim(),

        phone:
            document.getElementById(
                "customerPhone"
            )?.value.trim(),

        email:
            document.getElementById(
                "customerEmail"
            )?.value.trim(),

        address:
            document.getElementById(
                "customerAddress"
            )?.value.trim(),

        items:
            [...cart],

        createdAt:
            new Date().toISOString()

    };


    // Save the latest order locally

    localStorage.setItem(
        "serenityLastOrder",
        JSON.stringify(
            customerData
        )
    );


    // Clear cart

    cart = [];

    saveCart();

    updateCartCount();

    renderCart();


    // Close checkout

    closeCheckout();


    // Open success

    if (orderSuccessModal) {

        orderSuccessModal.classList.add(
            "active"
        );

        orderSuccessModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );

    }

}


window.placeOrder =
    placeOrder;


// ========================================
// GENERATE ORDER NUMBER
// ========================================

function generateOrderNumber() {

    const now =
        new Date();


    const year =
        now.getFullYear();


    const month =
        String(
            now.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            now.getDate()
        ).padStart(
            2,
            "0"
        );


    const random =
        Math.floor(
            1000 +
            Math.random() * 9000
        );


    return `SRN-${year}${month}${day}-${random}`;

}


// ========================================
// CLOSE ORDER SUCCESS
// ========================================

function closeOrderSuccess() {

    if (!orderSuccessModal) {
        return;
    }


    orderSuccessModal.classList.remove(
        "active"
    );


    orderSuccessModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-open"
    );

}


window.closeOrderSuccess =
    closeOrderSuccess;


// ========================================
// KEYBOARD
// ========================================

document.addEventListener(
    "keydown",
    (event) => {

        // ESC

        if (
            event.key === "Escape"
        ) {

            closeProduct();

            closeCart();

            closeCheckout();

            closeOrderSuccess();

        }


        // PRODUCT GALLERY

        if (
            productModal &&
            productModal.classList.contains(
                "active"
            ) &&
            currentProduct
        ) {

            if (
                event.key ===
                "ArrowLeft"
            ) {

                changeProductImage(
                    -1
                );

            }


            if (
                event.key ===
                "ArrowRight"
            ) {

                changeProductImage(
                    1
                );

            }

        }

    }
);


// ========================================
// PRODUCT MODAL OVERLAY
// ========================================

if (productModal) {

    productModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                productModal
            ) {

                closeProduct();

            }

        }
    );

}


// ========================================
// CART MODAL OVERLAY
// ========================================

if (cartModal) {

    cartModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                cartModal
            ) {

                closeCart();

            }

        }
    );

}


// ========================================
// CHECKOUT MODAL OVERLAY
// ========================================

if (checkoutModal) {

    checkoutModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                checkoutModal
            ) {

                closeCheckout();

            }

        }
    );

}


// ========================================
// ORDER SUCCESS OVERLAY
// ========================================

if (orderSuccessModal) {

    orderSuccessModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                orderSuccessModal
            ) {

                closeOrderSuccess();

            }

        }
    );

}


// ========================================
// INITIALIZE CART
// ========================================

function initCart() {

    loadCart();

    updateCartCount();

    renderCart();

}