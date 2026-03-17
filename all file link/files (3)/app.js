/* ============================================================
   NEXMART - Main Application JavaScript
   ============================================================ */

'use strict';

// ============================================================
// PRODUCT DATA
// ============================================================
const PRODUCTS = [
  { id:1, name:"Apple iPhone 15 Pro Max 256GB", category:"electronics", subcat:"mobiles", price:134900, originalPrice:149900, rating:4.8, reviews:12540, discount:10, emoji:"📱", badge:"hot", mood:["luxury","trending"], brand:"Apple", desc:"The ultimate iPhone with titanium design, A17 Pro chip, and a 48MP main camera system for stunning photography." },
  { id:2, name:"Samsung Galaxy S24 Ultra 512GB", category:"electronics", subcat:"mobiles", price:129999, originalPrice:149999, rating:4.7, reviews:8320, discount:13, emoji:"📱", badge:"new", mood:["luxury","trending"], brand:"Samsung", desc:"Galaxy AI transforms how you communicate, search, and create. Now with a built-in S Pen and 200MP camera." },
  { id:3, name:"Sony WH-1000XM5 Wireless Headphones", category:"electronics", subcat:"audio", price:28990, originalPrice:39990, rating:4.9, reviews:6780, discount:28, emoji:"🎧", badge:"deal", mood:["trending","gift"], brand:"Sony", desc:"Industry-leading noise canceling with exceptional sound quality. Up to 30-hour battery life." },
  { id:4, name:"MacBook Air M3 13-inch 8GB/256GB", category:"electronics", subcat:"laptops", price:114900, originalPrice:119900, rating:4.9, reviews:4250, discount:4, emoji:"💻", badge:"new", mood:["luxury"], brand:"Apple", desc:"Supercharged by M3 chip, MacBook Air is the most capable and thin and light notebook in history." },
  { id:5, name:"Nike Air Max 270 Running Shoes", category:"fashion", subcat:"footwear", price:8995, originalPrice:12995, rating:4.5, reviews:9800, discount:31, emoji:"👟", badge:"hot", mood:["trending","budget"], brand:"Nike", desc:"Inspired by the iconic Air Max 180 and Air Max 93, the Air Max 270 delivers all-day comfort and bold style." },
  { id:6, name:"Levi's 511 Slim Fit Jeans", category:"fashion", subcat:"bottomwear", price:2399, originalPrice:3499, rating:4.3, reviews:15600, discount:31, emoji:"👖", badge:"", mood:["budget","trending"], brand:"Levi's", desc:"Iconic slim fit jeans that sit below the waist with a slim fit through the thigh." },
  { id:7, name:"Dyson V15 Detect Cordless Vacuum", category:"home", subcat:"appliances", price:52900, originalPrice:62900, rating:4.7, reviews:3200, discount:16, emoji:"🧹", badge:"", mood:["luxury","office"], brand:"Dyson", desc:"Powered by our most powerful digital motor. Reveals hidden dust with the laser. Intelligently optimizes." },
  { id:8, name:"Philips Air Fryer XXL 7.3L", category:"home", subcat:"kitchen", price:8999, originalPrice:13999, rating:4.6, reviews:7800, discount:36, emoji:"🍳", badge:"deal", mood:["budget","eco"], brand:"Philips", desc:"Air fry with 90% less fat using Rapid Air Technology. Perfect for family cooking with 1.4 kg capacity." },
  { id:9, name:"Adidas Ultraboost 22 Running Shoes", category:"fashion", subcat:"footwear", price:12995, originalPrice:17995, rating:4.6, reviews:5400, discount:28, emoji:"👟", badge:"", mood:["trending","luxury"], brand:"Adidas", desc:"Energy-returning cushioning made partly with Parley Ocean Plastic. Feel the boost under your foot." },
  { id:10, name:"boAt Airdopes 141 TWS Earbuds", category:"electronics", subcat:"audio", price:999, originalPrice:2990, rating:4.2, reviews:89000, discount:67, emoji:"🎧", badge:"hot", mood:["budget"], brand:"boAt", desc:"Immersive audio with 42H total playback, Type-C charging, and ENx™ Technology for clear calls." },
  { id:11, name:"IKEA MALM Queen Bed Frame", category:"home", subcat:"furniture", price:14990, originalPrice:18990, rating:4.4, reviews:2100, discount:21, emoji:"🛏️", badge:"", mood:["luxury","office"], brand:"IKEA", desc:"Clean-lined bed frame in durable particleboard with high-gloss finish. Fits standard queen mattress." },
  { id:12, name:"Dell XPS 15 Intel Core i7 32GB/1TB", category:"electronics", subcat:"laptops", price:139990, originalPrice:159990, rating:4.7, reviews:2890, discount:13, emoji:"💻", badge:"", mood:["luxury","office"], brand:"Dell", desc:"Designed for performance with 12th Gen Intel Core i7, OLED display, and all-day battery life." },
  { id:13, name:"Allen Solly Regular Fit Formal Shirt", category:"fashion", subcat:"topwear", price:1299, originalPrice:2199, rating:4.1, reviews:24300, discount:41, emoji:"👔", badge:"deal", mood:["budget","office"], brand:"Allen Solly", desc:"Classic regular fit formal shirt in breathable cotton blend. Perfect for office and formal occasions." },
  { id:14, name:"Instant Pot Duo 7-in-1 Electric Pressure Cooker", category:"home", subcat:"kitchen", price:6999, originalPrice:9999, rating:4.7, reviews:31000, discount:30, emoji:"🍲", badge:"hot", mood:["budget","eco"], brand:"Instant Pot", desc:"7-in-1 multi-use cooker replaces pressure cooker, slow cooker, rice cooker, steamer, and more." },
  { id:15, name:"LG OLED evo C3 55\" 4K Smart TV", category:"electronics", subcat:"tvs", price:119990, originalPrice:159990, rating:4.8, reviews:1890, discount:25, emoji:"📺", badge:"deal", mood:["luxury","trending"], brand:"LG", desc:"Self-lit OLED pixels for perfect black levels and infinite contrast. webOS22 with ThinQ AI." },
  { id:16, name:"Yoga Mat Premium Non-Slip 6mm", category:"sports", subcat:"fitness", price:1299, originalPrice:2499, rating:4.4, reviews:12000, discount:48, emoji:"🧘", badge:"", mood:["budget","eco"], brand:"NEXMART", desc:"Premium TPE yoga mat with alignment lines, carrying strap, and extra thickness for joint support." },
  { id:17, name:"pTron Bassbuds Pro In-Ear TWS", category:"electronics", subcat:"audio", price:799, originalPrice:1499, rating:4.0, reviews:45000, discount:47, emoji:"🎵", badge:"", mood:["budget"], brand:"pTron", desc:"30H total playtime with 6mm dynamic drivers. IPX4 water resistance and Bluetooth 5.0." },
  { id:18, name:"H&M Cotton Basic T-Shirt Pack of 3", category:"fashion", subcat:"topwear", price:999, originalPrice:1799, rating:4.2, reviews:18900, discount:44, emoji:"👕", badge:"hot", mood:["budget"], brand:"H&M", desc:"Essential cotton t-shirts in classic cuts. Sustainably sourced cotton for everyday comfort." },
  { id:19, name:"Prestige Induction Cooktop 2000W", category:"home", subcat:"kitchen", price:2999, originalPrice:4499, rating:4.3, reviews:8700, discount:33, emoji:"🔥", badge:"", mood:["budget","eco"], brand:"Prestige", desc:"2000W induction cooktop with 7 preset cooking functions and crystal glass top." },
  { id:20, name:"Canon EOS R50 Mirrorless Camera Kit", category:"electronics", subcat:"cameras", price:69990, originalPrice:79990, rating:4.7, reviews:890, discount:13, emoji:"📷", badge:"new", mood:["luxury","trending"], brand:"Canon", desc:"24.2MP APS-C sensor mirrorless camera with Dual Pixel CMOS AF II and 4K video recording." }
];

const CATEGORIES = [
  { name:"Electronics", count:250, emoji:"💻", color:"#3b82f6" },
  { name:"Fashion", count:890, emoji:"👗", color:"#ec4899" },
  { name:"Home & Kitchen", count:430, emoji:"🏠", color:"#10b981" },
  { name:"Sports", count:160, emoji:"⚽", color:"#f59e0b" },
  { name:"Books", count:1200, emoji:"📚", color:"#8b5cf6" },
  { name:"Toys", count:320, emoji:"🧸", color:"#ef4444" },
  { name:"Beauty", count:540, emoji:"💄", color:"#f43f5e" },
  { name:"Grocery", count:890, emoji:"🛒", color:"#22c55e" }
];

const REVIEWS = [
  { name:"Priya Sharma", initial:"P", product:"iPhone 15 Pro Max", rating:5, text:"Absolutely love the camera quality on this phone! The portraits are stunning and delivery was super fast.", date:"2 days ago" },
  { name:"Rahul Verma", initial:"R", product:"Sony WH-1000XM5", rating:5, text:"Best headphones I've ever owned. The noise cancellation is incredible, perfect for my daily commute.", date:"1 week ago" },
  { name:"Anjali Patel", initial:"A", product:"Air Fryer XXL", rating:4, text:"Makes healthy cooking so easy! The entire family loves it. Crispy results every single time.", date:"5 days ago" },
  { name:"Karthik Nair", initial:"K", product:"Dell XPS 15", rating:5, text:"Blazing fast performance for coding and gaming. NEXMART delivered it in just 2 days. Highly recommend!", date:"3 days ago" },
  { name:"Meera Singh", initial:"M", product:"Nike Air Max 270", rating:4, text:"Super comfortable and stylish! Perfect for long walks. The cushioning is phenomenal.", date:"4 days ago" },
  { name:"Suresh Kumar", initial:"S", product:"Instant Pot", rating:5, text:"Changed my cooking forever. Made biryani in 30 mins that tasted amazing. Best purchase this year!", date:"6 days ago" }
];

const ORDERS = [
  { id:"NEX2026031201", date:"March 12, 2026", status:"delivered", items:"iPhone 15 Pro Max, AirPods Pro", total:139900 },
  { id:"NEX2026030502", date:"March 5, 2026", status:"shipped", items:"Sony WH-1000XM5", total:28990 },
  { id:"NEX2026022503", date:"Feb 25, 2026", status:"processing", items:"Dell XPS 15", total:139990 }
];

// ============================================================
// STATE
// ============================================================
let cart = JSON.parse(localStorage.getItem('nex_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('nex_wishlist') || '[]');
let currentPage = 'home';
let flashInterval, heroInterval, countdownInterval;
let productsShown = 8;
let currentProducts = [...PRODUCTS];
let voiceListening = false;
let currentSlide = 0;

// ============================================================
// INIT
// ============================================================
$(document).ready(function() {
  updateCartCount();
  updateWishlistCount();
  renderHomePage();
  startHeroAutoSlide();
  startFlashCountdown();
  initSearchSuggestions();
  initVoiceSearch();
  renderProductsPage();
  renderCartPage();
  renderCheckoutSummary();
  renderAccountPage();
  
  // Mobile menu toggle
  $('#mobileMenuToggle').on('click', function() {
    $('#mobileMenu').toggleClass('open');
  });
  $('#mobileMenu').on('click', function(e) {
    if ($(e.target).is('#mobileMenu')) closeMobileMenu();
  });

  // Sticky header shrink
  $(window).on('scroll', function() {
    if ($(this).scrollTop() > 80) {
      $('#mainHeader').addClass('scrolled');
    } else {
      $('#mainHeader').removeClass('scrolled');
    }
  });

  // Live chat
  $('#liveChatBtn').on('click', function() {
    $('#liveChatPopup').toggleClass('active');
    setTimeout(() => { $('.chat-messages').scrollTop(99999); }, 100);
  });

  // Keyboard search
  $('#searchInput').on('keydown', function(e) {
    if (e.key === 'Enter') performSearch();
  });

  // Payment option toggle
  $(document).on('change', 'input[name="payment"]', function() {
    $('.payment-option').removeClass('active');
    $(this).closest('.payment-option').addClass('active');
    if ($(this).val() === 'card') {
      $('#cardDetails').slideDown();
    } else {
      $('#cardDetails').slideUp();
    }
  });
});

// ============================================================
// PAGE NAVIGATION
// ============================================================
function showPage(page) {
  $('.page').removeClass('active');
  $('#page-' + page).addClass('active');
  currentPage = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  if (page === 'cart') renderCartPage();
  if (page === 'checkout') { renderCartPage(); renderCheckoutSummary(); }
  if (page === 'account') renderAccountPage();
  if (page === 'products') renderProductsPage();
}

function showTab(tab) {
  $('.account-tab').removeClass('active');
  $('.acc-nav-btn').removeClass('active');
  $('#account-tab-' + tab).addClass('active');
  $('#tab-' + tab).addClass('active');
}

function closeMobileMenu() {
  $('#mobileMenu').removeClass('open');
}

// ============================================================
// HOME PAGE RENDERING
// ============================================================
function renderHomePage() {
  renderFlashSale();
  renderCategories();
  renderTrendingProducts();
  renderBestDeals();
  renderAIRecommendations();
  renderReviews();
}

function renderFlashSale() {
  const flashProds = PRODUCTS.filter(p => p.discount >= 25).slice(0, 4);
  let html = '';
  flashProds.forEach(p => {
    const soldPct = Math.floor(Math.random() * 40) + 40;
    html += `
    <div class="col-6 col-md-3">
      <div class="flash-product-card" onclick="showProductDetail(${p.id})">
        <div class="product-img-wrap mb-2">
          <div class="product-img-placeholder">${p.emoji}</div>
          <div class="product-badges"><span class="badge-discount">-${p.discount}%</span></div>
        </div>
        <div class="product-category">${p.brand}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-price mt-1">
          <span class="price-current">₹${p.price.toLocaleString('en-IN')}</span>
          <span class="price-original">₹${p.originalPrice.toLocaleString('en-IN')}</span>
        </div>
        <div class="flash-sale-bar mt-2">
          <div class="progress"><div class="progress-bar" style="width:${soldPct}%"></div></div>
          <div class="flash-sold-text">${soldPct}% sold</div>
        </div>
      </div>
    </div>`;
  });
  $('#flashSaleProducts').html(html);
}

function renderCategories() {
  let html = '';
  CATEGORIES.forEach(cat => {
    html += `
    <div class="col-6 col-md-3 col-lg-${Math.floor(12/4)}">
      <div class="category-card" onclick="filterByCategory('${cat.name.toLowerCase()}')">
        <span class="category-icon">${cat.emoji}</span>
        <h5>${cat.name}</h5>
        <span>${cat.count}+ Products</span>
      </div>
    </div>`;
  });
  $('#categoriesGrid').html(html);
}

function renderTrendingProducts(filter = 'all') {
  let prods = filter === 'all' ? PRODUCTS.slice(0, 8) : PRODUCTS.filter(p => p.category === filter).slice(0, 8);
  $('#trendingProducts').html(buildProductCards(prods));
}

function renderBestDeals() {
  const deals = PRODUCTS.filter(p => p.discount >= 30).slice(0, 4);
  $('#bestDeals').html(buildProductCards(deals));
}

function renderAIRecommendations() {
  const recs = [...PRODUCTS].sort(() => Math.random() - 0.5).slice(0, 4);
  let html = buildProductCards(recs);
  $('#aiRecommendations').html(html);
}

function renderReviews() {
  let html = '';
  REVIEWS.forEach(r => {
    const stars = '⭐'.repeat(r.rating);
    html += `
    <div class="col-md-6 col-lg-4 fade-in-up">
      <div class="review-card">
        <div class="reviewer-info">
          <div class="reviewer-avatar">${r.initial}</div>
          <div>
            <div class="reviewer-name">${r.name}</div>
            <div class="reviewer-product">${r.product}</div>
          </div>
          <div class="ms-auto" style="font-size:11px; color:var(--text-muted)">${r.date}</div>
        </div>
        <div class="stars">${stars}</div>
        <div class="review-text">${r.text}</div>
        <div class="review-verified"><i class="fas fa-check-circle"></i> Verified Purchase</div>
      </div>
    </div>`;
  });
  $('#customerReviews').html(html);
}

// ============================================================
// PRODUCT CARDS BUILDER
// ============================================================
function buildProductCards(products, flashStyle = false) {
  let html = '';
  products.forEach(p => {
    const inWishlist = wishlist.find(w => w.id === p.id);
    const badgeHtml = p.badge === 'hot' ? '<span class="badge-hot">HOT</span>' :
                      p.badge === 'new' ? '<span class="badge-new">NEW</span>' :
                      p.badge === 'deal' ? '<span class="badge-discount">DEAL</span>' : '';
    html += `
    <div class="col-6 col-md-4 col-xl-3 fade-in-up">
      <div class="product-card">
        <div class="product-img-wrap" onclick="showProductDetail(${p.id})">
          <div class="product-img-placeholder">${p.emoji}</div>
          <div class="product-badges">
            <span class="badge-discount">-${p.discount}%</span>
            ${badgeHtml}
          </div>
          <div class="product-actions">
            <button class="action-btn wishlist-btn ${inWishlist ? 'active' : ''}" onclick="event.stopPropagation(); toggleWishlist(${p.id})" title="Wishlist">
              <i class="fa${inWishlist ? 's' : 'r'} fa-heart"></i>
            </button>
            <button class="action-btn quick-view-btn" onclick="event.stopPropagation(); quickView(${p.id})" title="Quick View">
              <i class="fas fa-eye"></i>
            </button>
          </div>
        </div>
        <div class="product-body">
          <div class="product-category">${p.brand}</div>
          <div class="product-name" onclick="showProductDetail(${p.id})">${p.name}</div>
          <div class="product-rating">
            <span class="stars">${getStarsHtml(p.rating)}</span>
            <span class="rating-count">(${p.reviews.toLocaleString()})</span>
          </div>
          <div class="product-price">
            <span class="price-current">₹${p.price.toLocaleString('en-IN')}</span>
            <span class="price-original">₹${p.originalPrice.toLocaleString('en-IN')}</span>
            <span class="price-off">${p.discount}% off</span>
          </div>
          <button class="btn-add-cart" onclick="addToCart(${p.id})">
            <i class="fas fa-cart-plus me-1"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>`;
  });
  return html;
}

function getStarsHtml(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) html += '<i class="fas fa-star"></i>';
    else if (i - 0.5 <= rating) html += '<i class="fas fa-star-half-alt"></i>';
    else html += '<i class="far fa-star"></i>';
  }
  return html;
}

// ============================================================
// SECTION FILTER
// ============================================================
function filterSection(btn, filter) {
  $('.sec-tab').removeClass('active');
  $(btn).addClass('active');
  renderTrendingProducts(filter);
}

function filterByCategory(cat) {
  showPage('products');
  currentProducts = PRODUCTS.filter(p => p.category === cat || p.name.toLowerCase().includes(cat));
  renderProductsGrid();
}

function filterByMood(mood) {
  showPage('products');
  currentProducts = PRODUCTS.filter(p => p.mood && p.mood.includes(mood));
  if (currentProducts.length === 0) currentProducts = [...PRODUCTS];
  renderProductsGrid();
}

// ============================================================
// PRODUCTS PAGE
// ============================================================
function renderProductsPage() {
  currentProducts = [...PRODUCTS];
  renderProductsGrid();
  renderCategoryFilters();
}

function renderProductsGrid() {
  const shown = currentProducts.slice(0, productsShown);
  $('#productsGrid').html(buildProductCards(shown));
  $('#productCount').text(currentProducts.length);
  $('#loadMoreBtn').toggle(productsShown < currentProducts.length);
}

function renderCategoryFilters() {
  const cats = ['Electronics', 'Fashion', 'Home & Kitchen', 'Sports', 'Books'];
  let html = cats.map(c => `<label class="filter-options"><input type="checkbox" value="${c.toLowerCase()}" onchange="applyCategoryFilter()"> ${c}</label>`).join('');
  $('#categoryFilters').html(html);
}

function applyCategoryFilter() {
  const checked = [];
  $('#categoryFilters input:checked').each(function() { checked.push($(this).val()); });
  if (checked.length === 0) {
    currentProducts = [...PRODUCTS];
  } else {
    currentProducts = PRODUCTS.filter(p => checked.some(c => p.category.toLowerCase().includes(c) || c.includes(p.category)));
  }
  renderProductsGrid();
}

function updatePriceFilter(val) {
  $('#priceMax').text(parseInt(val).toLocaleString('en-IN'));
  currentProducts = PRODUCTS.filter(p => p.price <= parseInt(val));
  renderProductsGrid();
}

function clearFilters() {
  currentProducts = [...PRODUCTS];
  $('#categoryFilters input').prop('checked', false);
  $('#priceRangeMax').val(50000);
  $('#priceMax').text('50,000');
  renderProductsGrid();
}

function sortProducts(val) {
  switch(val) {
    case 'price-low': currentProducts.sort((a,b) => a.price - b.price); break;
    case 'price-high': currentProducts.sort((a,b) => b.price - a.price); break;
    case 'rating': currentProducts.sort((a,b) => b.rating - a.rating); break;
    case 'newest': currentProducts.sort((a,b) => b.id - a.id); break;
    case 'popularity': currentProducts.sort((a,b) => b.reviews - a.reviews); break;
  }
  renderProductsGrid();
}

function setView(mode) {
  if (mode === 'grid') {
    $('#gridViewBtn').addClass('active'); $('#listViewBtn').removeClass('active');
    $('#productsGrid').removeClass('list-view');
  } else {
    $('#listViewBtn').addClass('active'); $('#gridViewBtn').removeClass('active');
    $('#productsGrid').addClass('list-view');
  }
}

function loadMoreProducts() {
  productsShown += 8;
  renderProductsGrid();
}

function performSearch() {
  const query = $('#searchInput').val().trim().toLowerCase();
  if (!query) return;
  currentProducts = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.brand.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query)
  );
  productsShown = 8;
  showPage('products');
  renderProductsGrid();
  $('#searchSuggestions').removeClass('visible');
}

// ============================================================
// PRODUCT DETAIL PAGE
// ============================================================
function showProductDetail(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const inWishlist = wishlist.find(w => w.id === p.id);
  const related = PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);
  
  const html = `
  <div class="row g-4 product-detail-wrap">
    <div class="col-lg-5">
      <div class="product-gallery-main" id="mainProductImg">
        <div style="font-size:130px">${p.emoji}</div>
      </div>
      <div class="product-thumbs">
        ${[1,2,3,4].map(i => `<div class="product-thumb ${i===1?'active':''}" onclick="selectThumb(this)">${p.emoji}</div>`).join('')}
      </div>
    </div>
    <div class="col-lg-7">
      <div class="product-detail-info">
        <div class="product-detail-brand"><i class="fas fa-certificate me-1"></i>${p.brand} Official Store</div>
        <h1 class="product-detail-name">${p.name}</h1>
        <div class="product-rating mb-3">
          <span class="stars">${getStarsHtml(p.rating)}</span>
          <span class="rating-count ms-2">${p.rating} (${p.reviews.toLocaleString()} ratings)</span>
          <span class="ms-3 text-success" style="font-size:13px"><i class="fas fa-check-circle"></i> In Stock</span>
        </div>
        <div class="product-detail-price">
          <div class="product-price flex-wrap">
            <span class="price-current">₹${p.price.toLocaleString('en-IN')}</span>
            <span class="price-original ms-2">₹${p.originalPrice.toLocaleString('en-IN')}</span>
            <span class="price-off ms-2 fs-6">${p.discount}% OFF</span>
          </div>
          <p class="text-success mt-1" style="font-size:13px"><i class="fas fa-tag me-1"></i>You save ₹${(p.originalPrice - p.price).toLocaleString('en-IN')}</p>
        </div>
        
        <div class="detail-meta">
          <div class="meta-item"><i class="fas fa-shipping-fast"></i> Free Delivery by Tomorrow</div>
          <div class="meta-item"><i class="fas fa-undo"></i> 30-Day Returns</div>
          <div class="meta-item"><i class="fas fa-shield-alt"></i> 1-Year Warranty</div>
        </div>
        
        <p style="font-size:14px; color:var(--text-muted); line-height:1.7">${p.desc}</p>

        <div class="quantity-wrap">
          <label style="font-size:14px;font-weight:600">Quantity:</label>
          <button class="qty-btn" onclick="changeQty(-1)">−</button>
          <input type="number" class="qty-input" id="productQty" value="1" min="1" max="10">
          <button class="qty-btn" onclick="changeQty(1)">+</button>
        </div>

        <div class="d-flex gap-3 flex-wrap">
          <button class="btn-nexmart" onclick="addToCartFromDetail(${p.id})">
            <i class="fas fa-cart-plus me-2"></i>Add to Cart
          </button>
          <button class="btn-outline-nexmart ${inWishlist ? 'btn-nexmart' : ''}" onclick="toggleWishlist(${p.id}); this.classList.toggle('btn-nexmart')">
            <i class="${inWishlist ? 'fas' : 'far'} fa-heart me-2"></i>${inWishlist ? 'Wishlisted' : 'Wishlist'}
          </button>
        </div>

        <div class="delivery-info mt-3">
          <div class="delivery-info-item"><i class="fas fa-map-marker-alt"></i> <span>Deliver to: Ahmedabad, Gujarat 380015</span></div>
          <div class="delivery-info-item"><i class="fas fa-clock"></i> <span>Usually delivered in 1-2 business days</span></div>
          <div class="delivery-info-item"><i class="fas fa-star"></i> <span>Earn ${Math.floor(p.price/10)} NEXPOINTS on this purchase</span></div>
        </div>
      </div>
    </div>
  </div>

  <div class="row g-4 mt-2">
    <div class="col-12">
      <div class="account-card">
        <h4 class="mb-3">Customer Reviews</h4>
        <div class="row g-2 align-items-center mb-4">
          <div class="col-auto">
            <div style="font-size:4rem;font-weight:900;line-height:1">${p.rating}</div>
            <div class="stars">${getStarsHtml(p.rating)}</div>
            <div style="font-size:13px;color:var(--text-muted)">${p.reviews.toLocaleString()} reviews</div>
          </div>
          <div class="col">
            ${[5,4,3,2,1].map(n => `<div class="d-flex align-items-center gap-2 mb-1"><span style="font-size:12px;width:12px">${n}</span><div class="progress flex-grow-1" style="height:8px"><div class="progress-bar" style="width:${Math.random()*80+5}%;background:var(--primary)"></div></div></div>`).join('')}
          </div>
        </div>
        <div class="review-list">
          ${REVIEWS.slice(0,3).map(r => `
          <div class="review-item">
            <div class="d-flex align-items-center gap-2 mb-2">
              <div class="reviewer-avatar" style="width:36px;height:36px;font-size:14px">${r.initial}</div>
              <strong style="font-size:14px">${r.name}</strong>
              <span class="stars" style="font-size:12px">${getStarsHtml(r.rating)}</span>
              <span style="font-size:11px;color:var(--text-muted);margin-left:auto">${r.date}</span>
            </div>
            <p style="font-size:14px;color:var(--text-muted);margin:0">${r.text}</p>
          </div>`).join('')}
        </div>
      </div>
    </div>

    <div class="col-12">
      <h4 class="mb-3">Related Products</h4>
      <div class="row g-3">${buildProductCards(related)}</div>
    </div>
  </div>`;

  $('#productDetailContent').html(`
    <div class="mb-3">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#" onclick="showPage('home')" style="color:var(--primary)">Home</a></li>
          <li class="breadcrumb-item"><a href="#" onclick="showPage('products')" style="color:var(--primary)">Products</a></li>
          <li class="breadcrumb-item active">${p.name.substring(0,30)}...</li>
        </ol>
      </nav>
    </div>
    ${html}
  `);
  showPage('product-detail');
}

function selectThumb(el) {
  $('.product-thumb').removeClass('active');
  $(el).addClass('active');
}

function changeQty(delta) {
  const input = $('#productQty');
  let val = parseInt(input.val()) + delta;
  if (val < 1) val = 1;
  if (val > 10) val = 10;
  input.val(val);
}

function addToCartFromDetail(id) {
  const qty = parseInt($('#productQty').val()) || 1;
  for (let i = 0; i < qty; i++) addToCart(id, false);
  showToast(`<i class="fas fa-check-circle text-success me-2"></i>${qty} item(s) added to cart!`);
  updateCartCount();
}

// ============================================================
// QUICK VIEW MODAL
// ============================================================
function quickView(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const html = `
  <div class="row g-4">
    <div class="col-md-5">
      <div class="product-gallery-main" style="border-radius:var(--radius)">
        <div style="font-size:100px">${p.emoji}</div>
      </div>
    </div>
    <div class="col-md-7" style="padding:24px 24px 24px 8px">
      <div style="color:var(--primary);font-size:13px;font-weight:700">${p.brand}</div>
      <h3 style="font-weight:800;margin:8px 0 12px">${p.name}</h3>
      <div class="product-rating mb-2"><span class="stars">${getStarsHtml(p.rating)}</span><span style="font-size:12px;margin-left:6px;color:var(--text-muted)">(${p.reviews.toLocaleString()})</span></div>
      <div class="product-price mb-3">
        <span class="price-current" style="font-size:1.8rem">₹${p.price.toLocaleString('en-IN')}</span>
        <span class="price-original ms-2">₹${p.originalPrice.toLocaleString('en-IN')}</span>
        <span class="price-off ms-2">${p.discount}% OFF</span>
      </div>
      <p style="font-size:14px;color:var(--text-muted);line-height:1.7">${p.desc}</p>
      <div class="d-flex gap-3 mt-3">
        <button class="btn-nexmart" onclick="addToCart(${p.id}); bootstrap.Modal.getInstance($('#quickViewModal')[0]).hide()"><i class="fas fa-cart-plus me-2"></i>Add to Cart</button>
        <button class="btn-outline-nexmart" onclick="showProductDetail(${p.id}); bootstrap.Modal.getInstance($('#quickViewModal')[0]).hide()">View Full Details</button>
      </div>
    </div>
  </div>`;
  $('#quickViewContent').html(html);
  new bootstrap.Modal($('#quickViewModal')[0]).show();
}

// ============================================================
// CART
// ============================================================
function addToCart(id, notify = true) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty = Math.min(existing.qty + 1, 10);
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  updateCartCount();
  if (notify) showToast(`<i class="fas fa-check-circle text-success me-2"></i><strong>${product.name.substring(0,30)}...</strong> added to cart!`);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  updateCartCount();
  renderCartPage();
  renderCheckoutSummary();
}

function updateCartQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty = Math.max(1, Math.min(10, item.qty + delta));
  saveCart();
  renderCartPage();
  renderCheckoutSummary();
}

function saveCart() {
  localStorage.setItem('nex_cart', JSON.stringify(cart));
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  $('#cartCount').text(count).toggle(count > 0);
}

function renderCartPage() {
  if (cart.length === 0) {
    $('#cartContent').html(`
    <div class="cart-empty">
      <div class="cart-empty-icon"><i class="fas fa-shopping-cart"></i></div>
      <h3 class="mb-2">Your cart is empty</h3>
      <p class="text-muted mb-4">Looks like you haven't added anything yet. Start exploring!</p>
      <button class="btn-nexmart" onclick="showPage('products')"><i class="fas fa-store me-2"></i>Continue Shopping</button>
    </div>`);
    return;
  }
  
  let itemsHtml = '';
  cart.forEach(item => {
    itemsHtml += `
    <div class="cart-item mb-3" id="cart-item-${item.id}">
      <div class="cart-item-img">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">${item.brand} · <span class="text-success">In Stock</span></div>
        <div class="cart-qty-wrap">
          <button class="btn-qty" onclick="updateCartQty(${item.id}, -1)">−</button>
          <span class="cart-qty-val">${item.qty}</span>
          <button class="btn-qty" onclick="updateCartQty(${item.id}, 1)">+</button>
          <button class="btn-remove ms-2" onclick="removeFromCart(${item.id})"><i class="fas fa-trash-alt"></i></button>
        </div>
      </div>
      <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
    </div>`;
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 499 ? 0 : 49;
  const discount = Math.floor(subtotal * 0.05);
  const total = subtotal + shipping - discount;

  $('#cartContent').html(`
  <div class="row g-4">
    <div class="col-lg-8">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4 style="margin:0">Cart (${cart.length} item${cart.length > 1 ? 's' : ''})</h4>
        <button class="btn btn-link text-danger" onclick="clearCart()">Clear Cart</button>
      </div>
      ${itemsHtml}
      <button class="btn-outline-nexmart mt-2" onclick="showPage('products')"><i class="fas fa-arrow-left me-2"></i>Continue Shopping</button>
    </div>
    <div class="col-lg-4">
      <div class="order-summary-card">
        <h5>Price Details</h5>
        <div class="summary-row"><span>Subtotal (${cart.length} items)</span><span>₹${subtotal.toLocaleString('en-IN')}</span></div>
        <div class="summary-row text-success"><span>NEXMART Discount</span><span>−₹${discount.toLocaleString('en-IN')}</span></div>
        <div class="summary-row"><span>Delivery</span><span class="${shipping === 0 ? 'text-success' : ''}">${shipping === 0 ? 'FREE' : '₹' + shipping}</span></div>
        <div class="summary-row total"><span>Total Amount</span><span class="text-success">₹${total.toLocaleString('en-IN')}</span></div>
        <div class="coupon-input">
          <input type="text" placeholder="Enter coupon code">
          <button>Apply</button>
        </div>
        <button class="btn-nexmart w-100 mt-3" onclick="showPage('checkout')">
          <i class="fas fa-lock me-2"></i>Proceed to Checkout (₹${total.toLocaleString('en-IN')})
        </button>
        <p class="text-center text-muted mt-2" style="font-size:12px"><i class="fas fa-shield-alt me-1"></i> Safe and Secure Payments</p>
      </div>
    </div>
  </div>`);
}

function clearCart() {
  cart = [];
  saveCart();
  updateCartCount();
  renderCartPage();
}

function renderCheckoutSummary() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = Math.floor(subtotal * 0.05);
  const total = subtotal - discount;

  $('#checkoutSummary').html(`
  <h5 class="mb-4">Order Summary</h5>
  ${cart.map(item => `
  <div class="d-flex gap-3 align-items-center mb-3">
    <div style="font-size:32px;flex-shrink:0">${item.emoji}</div>
    <div class="flex-grow-1">
      <div style="font-size:13px;font-weight:600">${item.name.substring(0,35)}...</div>
      <div style="font-size:12px;color:var(--text-muted)">Qty: ${item.qty}</div>
    </div>
    <div style="font-weight:800">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
  </div>`).join('')}
  <hr>
  <div class="summary-row"><span>Subtotal</span><span>₹${subtotal.toLocaleString('en-IN')}</span></div>
  <div class="summary-row text-success"><span>Discount</span><span>−₹${discount.toLocaleString('en-IN')}</span></div>
  <div class="summary-row"><span>Delivery</span><span class="text-success">FREE</span></div>
  <div class="summary-row total"><span>Total</span><span class="text-success">₹${total.toLocaleString('en-IN')}</span></div>
  <button class="btn-nexmart w-100 mt-3" onclick="placeOrder()">
    <i class="fas fa-check-circle me-2"></i>Place Order
  </button>
  <p class="text-center text-muted mt-2" style="font-size:12px"><i class="fas fa-shield-alt me-1"></i> 100% Secure Payment</p>`);
}

function placeOrder() {
  showToast('<i class="fas fa-check-circle text-success me-2"></i> Order placed successfully! 🎉 Track in My Account');
  ORDERS.unshift({ id: 'NEX' + Date.now(), date: new Date().toLocaleDateString('en-IN', {year:'numeric',month:'long',day:'numeric'}), status:'processing', items: cart.map(c => c.name.substring(0,20)).join(', '), total: cart.reduce((sum,item) => sum + item.price * item.qty, 0) });
  cart = [];
  saveCart();
  updateCartCount();
  showPage('account');
  showTab('orders');
}

// ============================================================
// WISHLIST
// ============================================================
function toggleWishlist(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const idx = wishlist.findIndex(w => w.id === id);
  if (idx > -1) {
    wishlist.splice(idx, 1);
    showToast('<i class="fas fa-heart-broken text-danger me-2"></i> Removed from wishlist');
  } else {
    wishlist.push(product);
    showToast('<i class="fas fa-heart text-danger me-2"></i> Added to wishlist!');
  }
  localStorage.setItem('nex_wishlist', JSON.stringify(wishlist));
  updateWishlistCount();
  if (currentPage === 'account') renderWishlist();
}

function updateWishlistCount() {
  $('#wishlistCount').text(wishlist.length).toggle(wishlist.length > 0);
  $('#wishlistBadge').text(wishlist.length);
}

function renderWishlist() {
  if (wishlist.length === 0) {
    $('#wishlistGrid').html('<div class="col-12 text-center py-5"><div style="font-size:60px;color:var(--text-muted)"><i class="far fa-heart"></i></div><p class="mt-3 text-muted">Your wishlist is empty</p><button class="btn-nexmart" onclick="showPage(\'products\')">Explore Products</button></div>');
    return;
  }
  $('#wishlistGrid').html(buildProductCards(wishlist));
}

// ============================================================
// ACCOUNT PAGE
// ============================================================
function renderAccountPage() {
  renderOrderHistory();
  renderWishlist();
}

function renderOrderHistory() {
  const html = ORDERS.map(o => `
  <div class="order-item">
    <div class="order-header">
      <div>
        <div class="order-id"><i class="fas fa-box me-1" style="color:var(--primary)"></i>${o.id}</div>
        <div class="order-date">${o.date}</div>
      </div>
      <span class="order-status status-${o.status}">${o.status.charAt(0).toUpperCase() + o.status.slice(1)}</span>
    </div>
    <div class="order-items-preview">${o.items}</div>
    <div class="d-flex justify-content-between align-items-center mt-2">
      <span class="order-total">₹${o.total.toLocaleString('en-IN')}</span>
      <button class="btn btn-sm btn-outline-secondary" style="font-size:12px;border-radius:20px">View Details</button>
    </div>
  </div>`).join('');
  $('#orderHistory').html(html || '<p class="text-muted">No orders yet</p>');
}

// ============================================================
// HERO SLIDER
// ============================================================
function changeSlide(direction) {
  const slides = $('.hero-slide').length;
  currentSlide = (currentSlide + direction + slides) % slides;
  goToSlide(currentSlide);
}

function goToSlide(n) {
  currentSlide = n;
  $('.hero-slide').removeClass('active');
  $('.hero-dot').removeClass('active');
  $('.hero-slide').eq(n).addClass('active');
  $('.hero-dot').eq(n).addClass('active');
}

function startHeroAutoSlide() {
  clearInterval(heroInterval);
  heroInterval = setInterval(() => changeSlide(1), 5000);
}

// ============================================================
// FLASH COUNTDOWN
// ============================================================
function startFlashCountdown() {
  let endTime = new Date();
  endTime.setHours(endTime.getHours() + 5);
  endTime.setMinutes(endTime.getMinutes() + 32);
  
  clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    const now = new Date();
    const diff = endTime - now;
    if (diff <= 0) { clearInterval(countdownInterval); return; }
    const hours = Math.floor(diff / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    $('#fh').text(String(hours).padStart(2,'0'));
    $('#fm').text(String(mins).padStart(2,'0'));
    $('#fs').text(String(secs).padStart(2,'0'));
  }, 1000);
}

// ============================================================
// SEARCH SUGGESTIONS
// ============================================================
function initSearchSuggestions() {
  const suggestions = ['iPhone 15 Pro Max', 'Samsung Galaxy S24', 'Sony Headphones', 'MacBook Air M3', 'Nike Air Max', 'Air Fryer', 'Smart TV 4K', 'Wireless Earbuds', 'Yoga Mat', 'Laptop under 50000'];
  
  $('#searchInput').on('input', function() {
    const val = $(this).val().toLowerCase().trim();
    if (val.length < 2) { $('#searchSuggestions').removeClass('visible'); return; }
    
    const filtered = [...suggestions.filter(s => s.toLowerCase().includes(val)), ...PRODUCTS.filter(p => p.name.toLowerCase().includes(val)).slice(0,3).map(p => p.name)].slice(0, 6);
    
    let html = filtered.map(s => `<div class="suggestion-item" onclick="$('#searchInput').val('${s}'); performSearch()"><i class="fas fa-search"></i>${s}</div>`).join('');
    if (html) { $('#searchSuggestions').html(html).addClass('visible'); }
    else { $('#searchSuggestions').removeClass('visible'); }
  });

  $(document).on('click', function(e) {
    if (!$(e.target).closest('.search-container').length) $('#searchSuggestions').removeClass('visible');
  });
}

// ============================================================
// VOICE SEARCH
// ============================================================
function initVoiceSearch() {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    $('#voiceSearchBtn').hide();
    return;
  }
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-IN';
  recognition.continuous = false;
  recognition.onresult = function(e) {
    const transcript = e.results[0][0].transcript;
    $('#searchInput').val(transcript);
    performSearch();
    $('#voiceSearchBtn').removeClass('listening');
    voiceListening = false;
  };
  recognition.onerror = function() { $('#voiceSearchBtn').removeClass('listening'); voiceListening = false; };
  recognition.onend = function() { $('#voiceSearchBtn').removeClass('listening'); voiceListening = false; };

  $('#voiceSearchBtn').on('click', function() {
    if (!voiceListening) {
      recognition.start();
      voiceListening = true;
      $(this).addClass('listening');
      showToast('<i class="fas fa-microphone text-danger me-2"></i> Listening... speak now!');
    } else {
      recognition.stop();
    }
  });
}

// ============================================================
// DARK MODE
// ============================================================
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  $('#themeIcon').toggleClass('fa-moon fa-sun');
  $('#settingsDarkMode').prop('checked', !isDark);
  localStorage.setItem('nex_theme', isDark ? 'light' : 'dark');
}

// Apply saved theme
(function() {
  const savedTheme = localStorage.getItem('nex_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  if (savedTheme === 'dark') {
    setTimeout(() => { $('#themeIcon').removeClass('fa-moon').addClass('fa-sun'); $('#settingsDarkMode').prop('checked', true); }, 100);
  }
})();

document.getElementById('themeToggle').addEventListener('click', toggleTheme);

// ============================================================
// TOAST NOTIFICATIONS
// ============================================================
function showToast(message) {
  $('#toastMessage').html(message);
  const toastEl = $('#nexToast')[0];
  const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
  toast.show();
}

// ============================================================
// NEWSLETTER
// ============================================================
function subscribeNewsletter() {
  const email = $('#newsletterEmail').val();
  if (!email || !email.includes('@')) { showToast('<i class="fas fa-exclamation-circle text-warning me-2"></i> Please enter a valid email!'); return; }
  showToast('<i class="fas fa-check-circle text-success me-2"></i> 🎉 Subscribed! Your 20% off code: WELCOME20');
  $('#newsletterEmail').val('');
}

// ============================================================
// CONTACT FORM
// ============================================================
function submitContact(e) {
  e.preventDefault();
  showToast('<i class="fas fa-check-circle text-success me-2"></i> Message sent! We\'ll get back to you within 24 hours.');
  e.target.reset();
}

// ============================================================
// LIVE CHAT
// ============================================================
function sendChatMessage() {
  const msg = $('#chatInput').val().trim();
  if (!msg) return;
  
  const userBubble = `<div class="chat-bubble user">${msg}</div>`;
  $('#chatMessages').append(userBubble);
  $('#chatInput').val('');
  
  const responses = [
    "Thanks for reaching out! I'm checking that for you right now... 🔍",
    "Great question! Our team will be happy to help with that.",
    "I understand your concern. Let me connect you with a specialist.",
    "Your satisfaction is our top priority! Please give us a moment.",
    "I'd love to help with that! Can you share your order ID if it's order-related?",
    "We have amazing deals right now! Would you like me to show you? 🛍️"
  ];
  
  setTimeout(() => {
    const botBubble = `<div class="chat-bubble bot">${responses[Math.floor(Math.random() * responses.length)]}</div>`;
    $('#chatMessages').append(botBubble);
    $('.chat-messages').scrollTop(99999);
  }, 1200);
  
  $('.chat-messages').scrollTop(99999);
}

$('#chatInput').on('keydown', function(e) {
  if (e.key === 'Enter') sendChatMessage();
});

// ============================================================
// HEADER SCROLL EFFECT
// ============================================================
$('#mainHeader').addClass('transition-all');
$(window).on('scroll', function() {
  const scrolled = $(this).scrollTop() > 60;
  $('header.main-header').toggleClass('header-scrolled', scrolled);
});

// Trigger lazy renders
setTimeout(() => {
  renderHomePage();
}, 100);
