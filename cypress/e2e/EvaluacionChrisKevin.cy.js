
//ACCESO AL SITIO
describe('Acceso sitio', () => {
  it('accede', () => {
    cy.visit('http://zero.webappsecurity.com/')
  })
})



//PRUEBAS DE NAVEGACION
describe('pruebas de navegacion', () => {
  it('verificacion titulo', () => {

    cy.visit('http://zero.webappsecurity.com/')
    cy.title().should('eq', 'Zero - Personal Banking - Loans - Credit Cards')
  })
})



//PRUEBAS DE CONTENIDO
describe('pruebas de contenido', () => {
  it('CHECKING ACCOUNT ACTIVITY', () => {

    cy.visit('http://zero.webappsecurity.com/')

    cy.contains('Use Zero to view the most up-to-date listings of your deposits, withdrawals, interest payments, and a number of other useful transactions.')
    .should('exist');
  })

  it('MY MONEY MAP', () => {

    cy.visit('http://zero.webappsecurity.com/')
    cy.contains('Use Zero to set up and monitor your personalized money map. A money map is an easy-to-use online tool that helps you manage your finances efficiently. With Money Map, you can create a budget, sort your finances into spending and savings categories, check the interest your accounts are earning, and gain new understanding of your patterns with the help of Zero’s clear charts and graphs.')
    .should('exist');
  })

})



//PRUEBAS DE INTERACCION
describe('Prueba de interaccion', () => {

  //verificar si el menu esta visible luego de pasar el cursor sobre el.
  it('menús o submenús', () => {
    cy.visit('http://zero.webappsecurity.com/')
    cy.get('#nav').should('exist');
    cy.get('#nav').trigger('mouseover');
    cy.get('#nav').should('be.visible');
  })


  //verificar botones y enlaces de nuestro sitio.
  it('botones o enlaces', () => {
    
    //BOTONES DEL MENÚ
    //HOME
    cy.visit('http://zero.webappsecurity.com/')
    cy.get('#homeMenu').click()
    cy.url().should('eq', 'http://zero.webappsecurity.com/index.html');

    //ONLINE BANKING
    cy.visit('http://zero.webappsecurity.com/')
    cy.get('#onlineBankingMenu').click()
    cy.url().should('eq', 'http://zero.webappsecurity.com/online-banking.html');

    //FEEDBACK
    cy.visit('http://zero.webappsecurity.com/')
    cy.get('#feedback').click()
    cy.url().should('eq', 'http://zero.webappsecurity.com/feedback.html');

    //LOGIN
    cy.visit('http://zero.webappsecurity.com/')
    cy.get('#signin_button').click()
    cy.url().should('eq', 'http://zero.webappsecurity.com/login.html');
  })

})



//PRUEBAS DE RESPUESTA
describe('Pruebas de respuesta', () => {

  //SE PRUEBA EL FORMULARIO LOGIN CON CREDENCIALES INCORRECTAS
  it('Interaccion formulario login Credenciales incorrectas', () => {
    cy.visit('http://zero.webappsecurity.com/login.html')
    cy.get('#user_login').type('Christian Pineda');
    cy.get('#user_password').type('12345');
    cy.get('#user_remember_me').check();
    cy.get('.btn').click();
    cy.contains('Login and/or password are wrong.');
  })

  //SE PRUEBA EL FORMULARIO LOGIN SIN CREDENCIALES (COMPLETAMENTE VACIO)
  it('Interaccion formulario login sin credenciales', () => {
    cy.visit('http://zero.webappsecurity.com/login.html')
    cy.get('.btn').click();
    cy.contains('Login and/or password are wrong.');
  })
  //SE PRUEBA ENVIAR UN COMENTARIO CON CUADROS DE TEXTO VACIOS.
  it('Interaccion formulario feedback enviar comentario con campos completos', () => {
    cy.visit('http://zero.webappsecurity.com/feedback.html')
    cy.get('#name').type('Christian Pineda');
    cy.get('#email').type('12345')
    cy.get('#subject').type('AAAA')
    cy.get('#comment').type('AAAA')
    cy.get('.btn-signin').click()
    cy.url().should('eq', 'http://zero.webappsecurity.com/sendFeedback.html');
    cy.contains('Thank you for your comments, Christian Pineda. They will be reviewed by our Customer Service staff and given the full attention that they deserve. ');
  })

  it('Interaccion formulario feedback presionar boton clear', () => {
    cy.visit('http://zero.webappsecurity.com/feedback.html')
    cy.get('#name').type('Christian Pineda')
    cy.get('#email').type('12345')
    cy.get('#subject').type('AAAA')
    cy.get('#comment').type('AAAA')
    cy.get('[type="reset"]').click()
    cy.get('#name').should('have.value', '')
    cy.get('#email').should('have.value', '')
    cy.get('#subject').should('have.value', '')
    cy.get('#comment').should('have.value', '')
  })

})


//PRUEBAS ADICIONALES.
describe('Pruebas adicionales', () => {
  
  
  it('verificacion carga imagenes', () => {
    cy.visit('http://zero.webappsecurity.com/')
    cy.get('.active > img').each(($img) => {
      // Verifica que cada imagen tenga el atributo "src" definido
      cy.wrap($img).should('have.attr', 'src').and('include', '.jpg');
      
      // Verifica que cada imagen tenga el atributo "alt" definido
      cy.wrap($img).should('have.attr', 'alt').and('not.be.empty');
      
      // Verifica que la imagen se haya cargado correctamente (código de estado HTTP 200)
      cy.request($img.attr('src')).its('status').should('eq', 200);
    });
  })

    //ERROR ERROR ERROR ERROR ERROR ERROR
    it('Interaccion formulario feedback enviar comentario con campos vacios', () => {
      cy.visit('http://zero.webappsecurity.com/feedback.html')
      cy.get('.btn-signin').click()
      cy.get('#name')
      .should('be.visible')
      .and('have.text', 'Complete este campo.')
    })


})


