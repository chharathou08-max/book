// Book data
const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 12.99, image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", category: "Classic" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", price: 14.99, image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", category: "Classic" },
    { id: 3, title: "1984", author: "George Orwell", price: 10.99, image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", category: "Dystopian" },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen", price: 9.99, image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", category: "Romance" },
    { id: 5, title: "The Hobbit", author: "J.R.R. Tolkien", price: 16.99, image: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", category: "Fantasy" },
    { id: 6, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", price: 18.99, image: "https://images.unsplash.com/photo-1600189261867-30e5ffe7b8da?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", category: "Fantasy" },
    { id: 7, title: "The Da Vinci Code", author: "Dan Brown", price: 13.99, image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", category: "Mystery" },
    { id: 8, title: "The Alchemist", author: "Paulo Coelho", price: 11.99, image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", category: "Philosophical" }
];

// Simple translations
const translations = {
    en: {
        navHome: "Home", navBooks: "Books", navCategories: "Categories", navAbout: "About", navContact: "Contact",
        searchPlaceholder: "Search books...", signIn: "Sign In",
        heroTitle: "Discover Your Next Favorite Book", heroSubtitle: "Explore our curated collection.", heroButton: "Browse Collection",
        featuredBooks: "Featured Books", featuredSubtitle: "Handpicked selections",
        addToCart: "Add to Cart", viewDetails: "View Details"
    },
    km: {
        navHome: "ទំព័រដើម", navBooks: "សៀវភៅ", navCategories: "ប្រភេទ", navAbout: "អំពីយើង", navContact: "ទំនាក់ទំនង",
        searchPlaceholder: "ស្វែងរកសៀវភៅ...", signIn: "ចូលគណនី",
        heroTitle: "ស្វែងរកសៀវភៅដែលអ្នកចូលចិត្តបន្ទាប់", heroSubtitle: "ស្វែងរកការប្រមូលផ្តុំសៀវភៅរបស់យើង។", heroButton: "ស្វែងរកការប្រមូលផ្តុំ",
        featuredBooks: "សៀវភៅពិសេស", featuredSubtitle: "ការជ្រើសរើស",
        addToCart: "បន្ថែមទៅកន្ត្រក", viewDetails: "មើលព័ត៌មានលម្អិត"
    },
    zh: {
        navHome: "首页", navBooks: "图书", navCategories: "分类", navAbout: "关于我们", navContact: "联系我们",
        searchPlaceholder: "搜索图书...", signIn: "登录",
        heroTitle: "发现您下一本最爱的书", heroSubtitle: "探索我们精心策划的系列。", heroButton: "浏览收藏",
        featuredBooks: "精选图书", featuredSubtitle: "从我们的收藏中挑选",
        addToCart: "加入购物车", viewDetails: "查看详情"
    }
};

// Shopping cart state
let cart = [];
let cartTotal = 0;
let currentLanguage = 'en';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    renderBooks();
    setupEventListeners();
    updateCartUI();
    updateLanguage();
});

// Render books
function renderBooks() {
    const booksContainer = document.getElementById('books-container');
    if (!booksContainer) return;
    
    booksContainer.innerHTML = '';
    
    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.className = 'book-card';
        bookElement.innerHTML = `
            <div class="book-image">
                <img src="${book.image}" alt="${book.title}">
            </div>
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">by ${book.author}</p>
                <p class="book-price">$${book.price.toFixed(2)}</p>
                <div class="book-actions">
                    <button class="btn-add-to-cart" data-id="${book.id}">${translations[currentLanguage].addToCart}</button>
                    <button class="btn-view-details" data-id="${book.id}">${translations[currentLanguage].viewDetails}</button>
                </div>
            </div>
        `;
        booksContainer.appendChild(bookElement);
    });
    
    // Add event listeners
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const bookId = parseInt(e.target.dataset.id);
            addToCart(bookId);
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    // Language selector
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            currentLanguage = e.target.value;
            updateLanguage();
            renderBooks();
        });
    }
    
    // Cart icon
    const cartIcon = document.querySelector('.cart');
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            const cartModal = document.getElementById('cartModal');
            if (cartModal) cartModal.classList.add('active');
        });
    }
    
    // Close cart
    const closeCartBtn = document.querySelector('.close-cart');
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', () => {
            const cartModal = document.getElementById('cartModal');
            if (cartModal) cartModal.classList.remove('active');
        });
    }
    
    // Search
    const searchButton = document.querySelector('.search-box button');
    if (searchButton) {
        searchButton.addEventListener('click', handleSearch);
    }
    
    // Smooth scrolling
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Update language
function updateLanguage() {
    const lang = translations[currentLanguage];
    
    // Update navigation
    const navLinks = document.querySelectorAll('nav a');
    if (navLinks.length >= 5) {
        navLinks[0].textContent = lang.navHome;
        navLinks[1].textContent = lang.navBooks;
        navLinks[2].textContent = lang.navCategories;
        navLinks[3].textContent = lang.navAbout;
        navLinks[4].textContent = lang.navContact;
    }
    
    // Update header
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) searchInput.placeholder = lang.searchPlaceholder;
    const signInBtn = document.querySelector('.btn-login');
    if (signInBtn) signInBtn.textContent = lang.signIn;
    
    // Update hero section
    const heroTitle = document.querySelector('.hero h2');
    if (heroTitle) heroTitle.textContent = lang.heroTitle;
    const heroSubtitle = document.querySelector('.hero p');
    if (heroSubtitle) heroSubtitle.textContent = lang.heroSubtitle;
    const heroButton = document.querySelector('.hero .btn-primary');
    if (heroButton) heroButton.textContent = lang.heroButton;
    
    // Update featured books
    const featuredTitle = document.querySelector('.featured-books h2');
    if (featuredTitle) featuredTitle.textContent = lang.featuredBooks;
    const featuredSubtitle = document.querySelector('.featured-books .section-subtitle');
    if (featuredSubtitle) featuredSubtitle.textContent = lang.featuredSubtitle;
}

// Add to cart
function addToCart(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;
    
    const existingItem = cart.find(item => item.id === bookId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...book, quantity: 1 });
    }
    
    updateCartUI();
    showNotification(`${book.title} added to cart!`);
}

// Update cart UI
function updateCartUI() {
    cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((count, item) => count + item.quantity, 0);
    
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) cartCountElement.textContent = totalItems;
    
    const cartTotalElement = document.getElementById('cartTotal');
    if (cartTotalElement) cartTotalElement.textContent = `$${cartTotal.toFixed(2)}`;
    
    renderCartItems();
}

// Render cart items
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.title}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)} each</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });
}

// Handle search
function handleSearch() {
    const searchInput = document.querySelector('.search-box input');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm === '') {
        renderBooks();
        return;
    }
    
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.category.toLowerCase().includes(searchTerm)
    );
    
    const booksContainer = document.getElementById('books-container');
    if (!booksContainer) return;
    
    booksContainer.innerHTML = '';
    
    if (filteredBooks.length === 0) {
        booksContainer.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <h3>No books found for "${searchTerm}"</h3>
                <p>Try searching with different keywords</p>
            </div>
        `;
        return;
    }
    
    filteredBooks.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.className = 'book-card';
        bookElement.innerHTML = `
            <div class="book-image">
                <img src="${book.image}" alt="${book.title}">
            </div>
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">by ${book.author}</p>
                <p class="book-price">$${book.price.toFixed(2)}</p>
                <div class="book-actions">
                    <button class="btn-add-to-cart" data-id="${book.id}">${translations[currentLanguage].addToCart}</button>
                    <button class="btn-view-details" data-id="${book.id}">${translations[currentLanguage].viewDetails}</button>
                </div>
            </div>
        `;
        booksContainer.appendChild(bookElement);
    });
    
    // Re-add event listeners
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const bookId = parseInt(e.target.dataset.id);
            addToCart(bookId);
        });
    });
}

// Show notification
function showNotification(message) {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #3498db;
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 4000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);