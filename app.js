(function () {
  var site = window.siteContent;

  if (!site) {
    return;
  }

  function $(selector) {
    return document.querySelector(selector);
  }

  function $all(selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector));
  }

  function findPackageBySlug(slug) {
    return site.offerings.packages.find(function (item) {
      return item.slug === slug;
    });
  }

  function createNav(activeHref) {
    return site.navigation
      .map(function (item) {
        var active = item.href === activeHref ? " active" : "";
        return '<a class="nav-link' + active + '" href="' + item.href + '">' + item.label + "</a>";
      })
      .join("");
  }

  function createButton(item, className) {
    if (!item) {
      return "";
    }

    return '<a class="' + className + '" href="' + item.href + '">' + item.label + "</a>";
  }

  function createHero(page) {
    return (
      '<section class="hero">' +
      '<div class="hero-shell shell reveal">' +
      '<p class="section-kicker">' + page.hero.eyebrow + "</p>" +
      '<div class="hero-logo-stage">' +
      '<img class="hero-logo" src="' + site.brand.logo.src + '" alt="' + site.brand.logo.alt + '">' +
      "</div>" +
      "<h1>" + page.hero.title + "</h1>" +
      '<p class="hero-copy">' + page.hero.text + "</p>" +
      '<div class="hero-actions">' +
      createButton(page.hero.primaryCta, "button button-primary") +
      createButton(page.hero.secondaryCta, "button button-secondary") +
      "</div>" +
      '<ul class="hero-meta">' +
      page.hero.support
        .map(function (item) {
          return "<li>" + item + "</li>";
        })
        .join("") +
      "</ul>" +
      "</div>" +
      "</section>"
    );
  }

  function createAudienceList(items) {
    return (
      '<div class="pill-cloud">' +
      items
        .map(function (item) {
          return '<span class="pill">' + item + "</span>";
        })
        .join("") +
      "</div>"
    );
  }

  function createFeatureGrid(title, text, items, className) {
    return (
      '<section class="section-block">' +
      '<div class="shell reveal">' +
      '<div class="section-intro">' +
      "<h2>" + title + "</h2>" +
      '<p class="section-copy">' + text + "</p>" +
      "</div>" +
      '<div class="' + (className || "feature-grid") + '">' +
      items
        .map(function (item) {
          return (
            '<article class="feature-card">' +
            "<h3>" + item.title + "</h3>" +
            "<p>" + item.text + "</p>" +
            "</article>"
          );
        })
        .join("") +
      "</div>" +
      "</div>" +
      "</section>"
    );
  }

  function createServicePreview(title, text) {
    return (
      '<section class="section-block">' +
      '<div class="shell reveal">' +
      '<div class="section-intro">' +
      "<h2>" + title + "</h2>" +
      '<p class="section-copy">' + text + "</p>" +
      "</div>" +
      '<div class="service-grid">' +
      site.offerings.services
        .slice(0, 6)
        .map(function (item) {
          return (
            '<article class="service-card">' +
            "<h3>" + item.title + "</h3>" +
            "<p>" + item.text + "</p>" +
            "</article>"
          );
        })
        .join("") +
      "</div>" +
      '<div class="section-actions">' +
      '<a class="button button-secondary" href="services.html">View all services</a>' +
      "</div>" +
      "</div>" +
      "</section>"
    );
  }

  function createPackageCards(slugs, compact) {
    var packages = slugs
      ? slugs
          .map(function (slug) {
            return findPackageBySlug(slug);
          })
          .filter(Boolean)
      : site.offerings.packages;

    return (
      '<div class="' + (compact ? "package-grid package-grid-compact" : "package-grid") + '">' +
      packages
        .map(function (item) {
          var includes = compact ? item.includes.slice(0, 3) : item.includes;
          return (
            '<article class="package-card' + (item.slug === "premium-local-brand" && !compact ? " package-card-strong" : "") + '">' +
            '<div class="package-topline">' +
            '<p class="package-name">' + item.name + "</p>" +
            '<p class="package-price">' + item.price + "</p>" +
            "</div>" +
            '<p class="package-summary">' + item.summary + "</p>" +
            '<ul class="package-list">' +
            includes
              .map(function (detail) {
                return "<li>" + detail + "</li>";
              })
              .join("") +
            "</ul>" +
            '<a class="button ' +
            (item.slug === "premium-local-brand" && !compact ? "button-light" : "button-secondary") +
            '" href="contact.html?package=' +
            encodeURIComponent(item.name) +
            '#contact-form">Request this package</a>' +
            "</article>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  function createProcess(title, text, steps) {
    return (
      '<section class="section-block">' +
      '<div class="shell reveal">' +
      '<div class="section-intro">' +
      "<h2>" + title + "</h2>" +
      '<p class="section-copy">' + text + "</p>" +
      "</div>" +
      '<ol class="process-grid">' +
      steps
        .map(function (step, index) {
          return (
            '<li class="process-card">' +
            '<span class="process-number">0' + (index + 1) + "</span>" +
            "<p>" + step + "</p>" +
            "</li>"
          );
        })
        .join("") +
      "</ol>" +
      "</div>" +
      "</section>"
    );
  }

  function createFinalCta(cta) {
    return (
      '<section class="section-block section-block-tight">' +
      '<div class="shell reveal">' +
      '<div class="cta-panel">' +
      "<h2>" + cta.title + "</h2>" +
      '<p class="section-copy">' + cta.text + "</p>" +
      '<div class="hero-actions">' +
      createButton(cta.primaryCta, "button button-primary") +
      createButton(cta.secondaryCta, "button button-secondary") +
      "</div>" +
      "</div>" +
      "</div>" +
      "</section>"
    );
  }

  function renderHome() {
    var page = site.pages.home;

    return (
      createHero(page) +
      '<section class="section-block section-block-tight">' +
      '<div class="shell reveal">' +
      '<div class="brand-panel">' +
      '<img class="brand-panel-logo" src="' + site.brand.logo.src + '" alt="' + site.brand.logo.alt + '">' +
      '<div class="section-intro">' +
      "<h2>" + page.brandSpotlight.title + "</h2>" +
      '<p class="section-copy">' + page.brandSpotlight.text + "</p>" +
      "</div>" +
      createAudienceList(site.shared.audience) +
      "</div>" +
      "</div>" +
      "</section>" +
      '<section class="section-block">' +
      '<div class="shell reveal">' +
      '<div class="section-intro">' +
      "<h2>" + page.intro.title + "</h2>" +
      '<p class="section-copy">' + page.intro.text + "</p>" +
      "</div>" +
      "</div>" +
      "</section>" +
      createFeatureGrid(
        "Why local businesses need a modern website",
        "The website should do more than exist. It should help people trust the business and know what to do next.",
        site.shared.whyModernMatters
      ) +
      createServicePreview(page.servicesPreview.title, page.servicesPreview.text) +
      '<section class="section-block">' +
      '<div class="shell reveal">' +
      '<div class="section-intro">' +
      "<h2>" + page.packagePreview.title + "</h2>" +
      '<p class="section-copy">' + page.packagePreview.text + "</p>" +
      "</div>" +
      createPackageCards(page.packagePreview.slugs, true) +
      '<div class="section-actions">' +
      '<a class="button button-secondary" href="packages.html">See all packages</a>' +
      "</div>" +
      "</div>" +
      "</section>" +
      createFeatureGrid(page.whyWork.title, page.whyWork.text, site.shared.benefits) +
      createProcess(page.process.title, page.process.text, site.shared.processSteps) +
      '<section class="section-block">' +
      '<div class="shell reveal">' +
      '<div class="local-panel">' +
      '<div class="section-intro">' +
      "<h2>" + page.localArea.title + "</h2>" +
      '<p class="section-copy">' + page.localArea.text + "</p>" +
      "</div>" +
      createAudienceList(site.brand.towns) +
      "</div>" +
      "</div>" +
      "</section>" +
      createFinalCta(page.finalCta)
    );
  }

  function renderServices() {
    var page = site.pages.services;

    return (
      createHero(page) +
      '<section class="section-block">' +
      '<div class="shell reveal">' +
      '<div class="section-intro">' +
      "<h2>How the work is organized</h2>" +
      '<p class="section-copy">Every service is built to support a cleaner first impression, clearer information, and easier customer contact.</p>' +
      "</div>" +
      '<div class="feature-grid">' +
      page.serviceGroups
        .map(function (group) {
          return (
            '<article class="feature-card">' +
            "<h3>" + group.title + "</h3>" +
            "<p>" + group.text + "</p>" +
            '<ul class="detail-list">' +
            group.items
              .map(function (item) {
                return "<li>" + item + "</li>";
              })
              .join("") +
            "</ul>" +
            "</article>"
          );
        })
        .join("") +
      "</div>" +
      "</div>" +
      "</section>" +
      '<section class="section-block">' +
      '<div class="shell reveal">' +
      '<div class="section-intro">' +
      "<h2>" + page.serviceListTitle + "</h2>" +
      '<p class="section-copy">' + page.serviceListText + "</p>" +
      "</div>" +
      '<div class="service-grid">' +
      site.offerings.services
        .map(function (item) {
          return (
            '<article class="service-card">' +
            "<h3>" + item.title + "</h3>" +
            "<p>" + item.text + "</p>" +
            "</article>"
          );
        })
        .join("") +
      "</div>" +
      "</div>" +
      "</section>" +
      '<section class="section-block section-block-tight">' +
      '<div class="shell reveal">' +
      '<div class="note-panel">' +
      "<h2>" + page.assistantNote.title + "</h2>" +
      '<p class="section-copy">' + page.assistantNote.text + "</p>" +
      "</div>" +
      "</div>" +
      "</section>" +
      createFinalCta(page.finalCta)
    );
  }

  function renderPackages() {
    var page = site.pages.packages;

    return (
      createHero(page) +
      '<section class="section-block">' +
      '<div class="shell reveal">' +
      '<div class="section-intro">' +
      "<h2>" + page.intro.title + "</h2>" +
      '<p class="section-copy">' + page.intro.text + "</p>" +
      "</div>" +
      createPackageCards(null, false) +
      "</div>" +
      "</section>" +
      '<section class="section-block">' +
      '<div class="shell reveal section-split">' +
      '<article class="list-panel">' +
      "<h2>" + page.addOnsTitle + "</h2>" +
      '<p class="section-copy">' + page.addOnsText + "</p>" +
      '<ul class="price-list">' +
      site.offerings.addOns
        .map(function (item) {
          return '<li><span>' + item.label + "</span><strong>" + item.price + "</strong></li>";
        })
        .join("") +
      "</ul>" +
      "</article>" +
      '<article class="list-panel">' +
      "<h2>" + page.supportTitle + "</h2>" +
      '<p class="section-copy">' + page.supportText + "</p>" +
      '<ul class="price-list">' +
      site.offerings.supportPlans
        .map(function (item) {
          return '<li><span>' + item.label + "</span><strong>" + item.price + "</strong></li>";
        })
        .join("") +
      "</ul>" +
      "</article>" +
      "</div>" +
      "</section>" +
      createFinalCta(page.finalCta)
    );
  }

  function renderAbout() {
    var page = site.pages.about;

    return (
      createHero(page) +
      '<section class="section-block">' +
      '<div class="shell reveal">' +
      '<div class="feature-grid">' +
      page.storyBlocks
        .map(function (item) {
          return (
            '<article class="feature-card">' +
            "<h2>" + item.title + "</h2>" +
            "<p>" + item.text + "</p>" +
            "</article>"
          );
        })
        .join("") +
      "</div>" +
      "</div>" +
      "</section>" +
      createFeatureGrid(page.principlesTitle, "The work stays focused on practical outcomes that help the business look stronger online.", page.principles) +
      '<section class="section-block section-block-tight">' +
      '<div class="shell reveal">' +
      '<div class="brand-panel">' +
      '<img class="brand-panel-logo" src="' + site.brand.logo.src + '" alt="' + site.brand.logo.alt + '">' +
      '<div class="section-intro">' +
      "<h2>" + page.brandPanel.title + "</h2>" +
      '<p class="section-copy">' + page.brandPanel.text + "</p>" +
      '<p class="service-line">' + site.brand.serviceAreaLine + "</p>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</section>" +
      createFinalCta(page.finalCta)
    );
  }

  function renderContact() {
    var page = site.pages.contact;
    var options = ['<option value="">Choose a service or package</option>']
      .concat(
        site.offerings.packages.map(function (item) {
          return '<option value="' + item.name + '">' + item.name + "</option>";
        })
      )
      .concat(['<option value="Custom quote">Custom quote</option>'])
      .join("");

    return (
      createHero(page) +
      '<section class="section-block">' +
      '<div class="shell reveal section-split">' +
      '<article class="form-panel">' +
      '<div class="section-intro form-intro">' +
      "<h2>" + page.formTitle + "</h2>" +
      '<p class="section-copy">' + page.formText + "</p>" +
      "</div>" +
      '<form id="contact-form" class="contact-form" data-contact-form>' +
      '<div class="form-grid">' +
      '<label><span>Name</span><input name="name" type="text" placeholder="Your name" required></label>' +
      '<label><span>Business</span><input name="business" type="text" placeholder="Business name"></label>' +
      '<label><span>Email</span><input name="email" type="email" placeholder="you@example.com" required></label>' +
      '<label><span>Phone</span><input name="phone" type="tel" placeholder="(000) 000-0000"></label>' +
      '<label class="form-full"><span>Service or package</span><select name="interest">' + options + "</select></label>" +
      '<label class="form-full"><span>Project details</span><textarea name="details" rows="6" placeholder="What do you want the site to do better?"></textarea></label>' +
      "</div>" +
      '<button class="button button-primary" type="submit">Send quote request</button>' +
      '<p class="form-status" aria-live="polite"></p>' +
      "</form>" +
      "</article>" +
      '<article class="contact-panel">' +
      '<div class="section-intro">' +
      "<h2>" + page.intro.title + "</h2>" +
      '<p class="section-copy">' + page.intro.text + "</p>" +
      "</div>" +
      '<div class="contact-stack">' +
      '<div><p class="contact-label">Service area</p><p>' + site.brand.serviceAreaLine + "</p></div>" +
      '<div><p class="contact-label">Email</p><a href="mailto:' + site.brand.email + '">' + site.brand.email + "</a></div>" +
      '<div><p class="contact-label">Phone</p><a href="' + site.brand.phoneHref + '">' + site.brand.phoneDisplay + "</a></div>" +
      '<div><p class="contact-label">Custom quote</p><p>Use the form for a tailored scope, package recommendation, or a simple starting estimate.</p></div>' +
      "</div>" +
      '<div class="next-steps">' +
      "<h3>" + page.nextStepsTitle + "</h3>" +
      '<ul class="detail-list">' +
      page.nextSteps
        .map(function (item) {
          return "<li>" + item + "</li>";
        })
        .join("") +
      "</ul>" +
      "</div>" +
      "</article>" +
      "</div>" +
      "</section>"
    );
  }

  function renderPage(name) {
    switch (name) {
      case "home":
        return renderHome();
      case "services":
        return renderServices();
      case "packages":
        return renderPackages();
      case "about":
        return renderAbout();
      case "contact":
        return renderContact();
      default:
        return renderHome();
    }
  }

  function setPageMeta(page) {
    if (!page) {
      return;
    }

    document.title = page.seoTitle;

    var metaDescription = document.querySelector('meta[name="description"]');

    if (metaDescription) {
      metaDescription.setAttribute("content", page.seoDescription);
    }
  }

  function renderShared(pageHref) {
    var page = site.pages[document.body.getAttribute("data-page")] || site.pages.home;

    setPageMeta(page);
    $(".site-nav").innerHTML = createNav(pageHref);
    $(".footer-nav").innerHTML = createNav(pageHref);

    $(".brand-name").textContent = site.brand.name;
    $(".brand-slogan").textContent = site.brand.slogan;
    $(".footer-name").textContent = site.brand.name;
    $(".footer-slogan").textContent = site.brand.slogan;
    $(".footer-intro").textContent = site.brand.intro;
    $(".footer-area").textContent = site.brand.serviceAreaLine;
    $(".footer-note").textContent = site.brand.contactNote;

    var headerLogo = $(".brand-logo");
    var footerLogo = $(".footer-logo");
    headerLogo.src = site.brand.logo.src;
    headerLogo.alt = site.brand.logo.alt;
    footerLogo.src = site.brand.logo.src;
    footerLogo.alt = site.brand.logo.alt;

    var email = $(".footer-email");
    email.textContent = site.brand.email;
    email.href = "mailto:" + site.brand.email;

    var phone = $(".footer-phone");
    phone.textContent = site.brand.phoneDisplay;
    phone.href = site.brand.phoneHref;
  }

  function setupNav() {
    var toggle = $(".nav-toggle");
    var nav = $(".site-nav");

    if (!toggle || !nav) {
      return;
    }

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    $all(".site-nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function setupContactForm() {
    var form = document.querySelector("[data-contact-form]");

    if (!form) {
      return;
    }

    var interestField = form.querySelector('select[name="interest"]');
    var params = new URLSearchParams(window.location.search);
    var presetPackage = params.get("package");

    if (presetPackage && interestField) {
      interestField.value = presetPackage;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var status = form.querySelector(".form-status");
      var data = new FormData(form);
      var name = data.get("name") || "";
      var business = data.get("business") || "";
      var email = data.get("email") || "";
      var phone = data.get("phone") || "";
      var interest = data.get("interest") || "General inquiry";
      var details = data.get("details") || "";

      if (site.brand.email.indexOf("@") === -1) {
        status.textContent = "Update the email placeholder in content.js before using the quote form.";
        return;
      }

      var subject = [interest, business || name || "New website inquiry"].join(" - ");
      var body = [
        "Name: " + name,
        "Business: " + business,
        "Email: " + email,
        "Phone: " + phone,
        "Service or package: " + interest,
        "",
        "Project details:",
        details
      ].join("\n");

      status.textContent =
        "Your email app should open with your request. If it does not, send the details to " + site.brand.email + ".";

      window.location.href =
        "mailto:" +
        site.brand.email +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);
    });
  }

  function setupRevealAnimations() {
    var sections = $all(".reveal");

    if (!sections.length) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      sections.forEach(function (element) {
        element.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    sections.forEach(function (element) {
      observer.observe(element);
    });
  }

  var pageName = document.body.getAttribute("data-page");
  var pageHref = document.body.getAttribute("data-href");

  renderShared(pageHref);
  $("#page-content").innerHTML = renderPage(pageName);
  setupNav();
  setupContactForm();
  setupRevealAnimations();
})();
