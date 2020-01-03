/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

//## Test That have been implemented:
//
//Test that loops through and checks each feed in the allFeeds object to ensure it has a URL defined and that the URL is not empty.
//Test that loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.
//Test that ensures the menu element is hidden by default. You'll have to analyze the HTML and the CSS to determine how we're performing the hiding/showing of the menu element.
//Test that ensures the menu changes visibility when the menu icon is clicked. This test should have two expectations: does the menu display when clicked and does it hide when clicked again.
//Test that ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container.
//Test that ensures when a new feed is loaded by the loadFeed function that the content actually changes.
//
//all test pass with given code, and fail when the feed is altered in a way it should fail.
//
//Left all todo comments where test needed to be written for ease of finding and explained some of the logic of test
//

$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        
        describe('url defined test', function() {
              function isUrlDefined(url,x) {
                it('URL is not empty and is defined', function() {
//                    here we expect all feeds to have a non empty url
                 expect(allFeeds[x].url).toBeDefined();
                  expect(url.length).not.toBe(0);
                });
              }

              for(var x = 0; x < allFeeds.length; x++) {
                isUrlDefined(allFeeds[x].url, x);
              }
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        
        describe('name defined test', function() {
          function isNameDefined(name,x) {
            it('name is not empty and is defined', function() {
//                here we expect all names to not be empty
             expect(allFeeds[x].name).toBeDefined();
             expect(name.length).not.toBe(0);
            });
          }

          for(var x = 0; x < allFeeds.length; x++) {
            isNameDefined(allFeeds[x].name, x);
          }
        });
        
    });


    /* TODO: Write a new test suite named "The menu" */
    
    
    describe('The menu', function () {

        const body = document.getElementsByTagName('body')[0];
        const menuIcon = document.getElementsByClassName('menu-icon-link')[0];
        
         /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
    
        
        it('element is hidden by default', function () {
//         check for the menu to be hidden at first
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

        /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        it('changes visibility on click', function () {
//  check for the menu to be hidden
            expect(body.classList.contains('menu-hidden')).toBe(true);
// do menu click
            menuIcon.click(); 
// expect the menu to not be hidden after click
            expect(body.classList.contains('menu-hidden')).toBe(false);
            menuIcon.click();
// after reclick, menu should be re-hidden
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });


    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
         /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
    
        beforeEach(function(done) {
        	loadFeed(0, function() {
        		done();
        	});
        });

        it('are able to be loaded', function() {
			let entries = document.querySelectorAll('.feed .entry');
//            while using beforeeach as described in the todo, expect the length to not be 0
        	expect(entries.length).not.toBe(0);
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    
    describe('New Feed Selection', function() {
      var $preHeader;
      var $postHeader;
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                $preHeader = $('.header-title').html();
                loadFeed(1, function() {
                    $postHeader = $('.header-title').html();
                    done();
                })
            })
        })

      it("Should be expecting new content", function() {
//          check that the content changes by loadfeed function
        expect($preHeader).not.toEqual($postHeader);
      });
    }); 
}());
