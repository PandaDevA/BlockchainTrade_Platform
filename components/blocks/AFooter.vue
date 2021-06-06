<template>
  <div class="footer">
    <div class="wrap wrapper50">
      <div class="footer3-logo-wrapper">
        <img src="/images/logo-c.png" width="40" alt class="landing3-logo">
        <div class="text-14 text-14-60">Folex The Future of Trading</div>
      </div>
      <div class="divider-dark"></div>
      <div class="footer3-links-wrapper justify-between">
        <div class="footer-column">
          <div class="text-16 footer-section-headline">Legal</div>
          <a
            @click="openModal('legal-info')"
            class="link-dark footer-link-12-dark"
            style="transition: color 0.4s ease 0s, transform 0.4s ease 0s, opacity 0.4s ease 0s, -webkit-transform 0.4s ease 0s;"
          >Legal Information</a>
          <nuxt-link to="/privacy-policy" class="link-dark footer-link-12-dark">Privacy Policy</nuxt-link>
          <nuxt-link to="/terms" class="link-dark footer-link-12-dark">Terms & Conditions</nuxt-link>
        </div>
        <div class="footer-column">
          <div class="text-16 footer-section-headline">Info</div>
          <nuxt-link to="/fees" class="link-dark footer-link-12-dark">Fees</nuxt-link>
          <a
            href="https://drive.google.com/file/d/1d1dyiAXFM2i0lbTXPQBXaJ9OM0sYxJs2/view?usp=sharing"
            target="_blank"
            class="link-dark footer-link-12-dark"
            style="transition: color 0.4s ease 0s, transform 0.4s ease 0s, opacity 0.4s ease 0s, -webkit-transform 0.4s ease 0s;"
          >License</a>
        </div>
        <div class="footer-column">
          <div class="text-16 footer-section-headline">Menu</div>
          <nuxt-link to="/folex-coin" class="link-dark footer-link-12-dark">Folex Coin</nuxt-link>
          <a href="mailto:support@folex.io" class="link-dark footer-link-12-dark">Support</a>
        </div>
        <div class="footer-column">
          <div class="text-16 footer-section-headline">Social</div>
          <div class="home-footer-socicons-wrap d-flex">
            <a
              href="https://www.facebook.com/Folex-831505157056756/"
              target="_blank"
              class="home-footer-socicon-wrap w-inline-block"
            >
              <img src="/images/facebook-logo.svg" width="20" alt class="home-footer-socicon">
            </a>
            <a
              href="https://twitter.com/FolexOfficial"
              target="_blank"
              class="home-footer-socicon-wrap w-inline-block"
            >
              <img
                src="/images/home-socicon1_1home-socicon1.png"
                width="20"
                alt
                class="home-footer-socicon"
              >
            </a>
            <a
              href="https://www.instagram.com/folex_official/"
              target="_blank"
              class="home-footer-socicon-wrap w-inline-block"
            >
              <img
                src="/images/home-socicon2_1home-socicon2.png"
                width="20"
                alt
                class="home-footer-socicon"
              >
            </a>
            <a
              href="https://t.me/folex_official"
              target="_blank"
              class="home-footer-socicon-wrap home-footer-socicon-wrap-last w-inline-block"
            >
              <img
                src="/images/iconmonstr-telegram-3.svg"
                width="20"
                alt
                class="home-footer-socicon"
              >
            </a>
          </div>
        </div>
        <div class="footer-column">
          <div class="form1-form-wrap w-form">
            <form
              id="email-form"
              name="email-form"
              data-name="Email Form"
              method="post"
              action="https://folex.us19.list-manage.com/subscribe/post?u=a1a3bd7984040943588383f68&amp;amp;id=e9903d7a00"
              target="_blank"
              class="form1"
            >
              <input
                type="submit"
                value="Subscribe"
                data-wait="Please wait..."
                class="btn-small w-button"
              >
            </form>
            <div class="form1-success w-form-done">
              <div>Thank you! You have successfully subscribed</div>
            </div>
            <div class="form1-error w-form-fail">
              <div>Oops! Something went wrong while submitting the form.</div>
            </div>
          </div>
        </div>
      </div>
      <div class="divider-dark"></div>
      <div class="footer3-bottom-links-wrapper">
        <div class="text-14 text-14-60">Folex © {{ currentYear }}. All Rights Reserved.</div>
      </div>
    </div>
    <a-modal ref="legal-info">
      <h2 class="form2-headline">Legal Information</h2>
      <label for="name">Name of Company: FoLEx LLC</label>
      <label
        for="address"
      >Address: Address: Georgia, City Kutaisi, Avtomshenebeli str., N 88, (Free Industrial Zone of Kutaisi Hualing)</label>
      <label for="ceo">Name of CEO: Markus Sczeburek-Ort</label>
      
      <label for="email">Tel: +995 322 88 50 09</label>
      <label for="email">Email: support@folex.io</label>
      <label for="authorithy">Supervisery authorithy: LEPL National Agency of Public Registry</label>
      <label for="register">Commercial register, registry number: 406263797</label>
      <br>
      <p>
        The European Commission provides a platform for online disputere solution (OS) available at http://ec.europa.eu/consumers/odr/.
        <br>We are not obligated and unwilling to participate in a dispute settlement procedure before a consumer
        arbitrationboard.
        <br>
      </p>
      <br>
      <br>
    </a-modal>
  </div>
</template>

<script>
export default {
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  }
};
</script>

<style scoped>
.link-dark.footer-link-12-dark {
  margin-bottom: 10px;
  text-decoration: underline;
}
.link-dark {
  opacity: 0.6;
  -webkit-transition: color 400ms ease, opacity 400ms ease,
    -webkit-transform 400ms ease;
  transition: color 400ms ease, opacity 400ms ease, -webkit-transform 400ms ease;
  transition: color 400ms ease, transform 400ms ease, opacity 400ms ease;
  transition: color 400ms ease, transform 400ms ease, opacity 400ms ease,
    -webkit-transform 400ms ease;
  color: #fff;
  line-height: 24px;
}
.link-dark:hover {
  opacity: 1;
}
.divider-dark {
  width: 100%;
  height: 1px;
  background-color: hsla(0, 0%, 100%, 0.06);
}
</style>