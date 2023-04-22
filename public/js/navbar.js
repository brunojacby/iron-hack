import { Auth } from './auth.js';

// Load navbar and set active page
$(document).ready(function () {
  $('div[data-includeHTML]').each(function () {
    $(this).load($(this).attr('data-includeHTML'), () => {
      const session = Auth.getSession();
      if (session) {
        $('#profile-link').removeClass('d-none');
        $('#signin-link').addClass('d-none');
        $('#signup-link').addClass('d-none');
        $('#signout-btn').removeClass('d-none');
        $('#signout-btn').on('click', () => {
          Auth.signOut();
        });
      }
      const url = window.location.href;
      $('nav ul li a').each(function () {
        if (this.href === url) {
          $(this).closest('a').addClass('active');
        }
      });

      if (window.location.pathname === '/') {
        $('#home-link').addClass('active');
      }
    });
  });
});
