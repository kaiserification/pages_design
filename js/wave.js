;( function( window ) {
    "use strict";

    // On lance l'affichage de la vague au touch ou au click
    if ( "ontouchstart" in window ) {
        document.body.addEventListener( "touchstart", show, false );
    }
    document.body.addEventListener( "mousedown", show, false );

    // Cette fonction permet d'afficher une vague suite Ã  un Ã©vÃ¨nement
    function show( e ) {

        var element = null;

        // On regarde si l'Ã©vÃ¨nement affecte un Ã©lÃ©ment avec la class .wave-effect
        var target = e.target || e.srcElement;
        while ( target.parentElement !== null ) {
            if ( target.classList.contains( "wave-effect" ) ) {
                element = target;
                break;
            }
            target = target.parentElement;
        }

        // Si aucun Ã©lement .wave-effect on abandonne, it's a TRAP !
        if ( element === null ) {
            return false;
        }

        // On crÃ©e l'Ã©lÃ©ment wave et on l'ajoute Ã  notre Ã©lement
        var wave = document.createElement( "div" );
        wave.className = "wave";
        element.appendChild( wave );

        // On anime la transformation scale() sans oublier les prÃ©fixes...
        var position = getRelativeEventPostion( element, e );
        var radius = getRadius( element, position );
        var scale = "scale(1)";
        wave.style.left = ( position.x - radius ) + "px";
        wave.style.top = ( position.y - radius ) + "px";
        wave.style.width = ( radius * 2 ) + "px";
        wave.style.height = ( radius * 2 ) + "px";
        wave.style[ "-webkit-transform" ] = scale;
        wave.style[ "-moz-transform" ] = scale;
        wave.style[ "-ms-transform" ] = scale;
        wave.style[ "-o-transform" ] = scale;
        wave.style.transform = scale;

        // Quand on quitte le bouton
        element.addEventListener( "mouseup", hide, false );
        element.addEventListener( "mouseleave", hide, false );
        if ( "ontouchstart" in window ) {
            document.body.addEventListener( "touchend", hide, false );
        }

    }

    // DÃ©clenchÃ© au moment d'un release, on masque la derniÃ¨re vague prÃ©sente
    function hide( e ) {
        var element = this;

        // On trouve le dernier Ã©lement .wave
        var wave = null;
        var waves = element.getElementsByClassName( "wave" );
        if ( waves.length > 0 ) {
            wave = waves[ waves.length - 1 ];
        } else {
            return false;
        }

        // On fait disparaitre la vague en opacitÃ©
        wave.style.opacity = 0;

        // On supprime l'Ã©lÃ©ment vague au bout de la durÃ©e de l'animation
        setTimeout( function() {
            try {
                element.removeChild( wave );
            } catch ( e ) {
                return false;
            }
        }, 2000 );
    }

    // Permet de rÃ©cupÃ©rer la position d'un Ã©lement sur la page
    function getRelativeEventPostion( element, e ) {
        var offset = {
            top: element.getBoundingClientRect().top + window.pageYOffset - element.clientTop,
            left: element.getBoundingClientRect().left + window.pageXOffset - element.clientLeft
        };
        return {
            y: e.pageY - offset.top,
            x: e.pageX - offset.left
        };
    }

    // Permet d'obtenir le rayon d'un cercle qui contiendra tout l'Ã©lÃ©ment, merci Pythagore ^^
    function getRadius( element, position ) {
        var w = Math.max( position.x, element.clientWidth - position.x );
        var h = Math.max( position.y, element.clientHeight - position.y );
        return Math.ceil( Math.sqrt( Math.pow( w, 2 ) + Math.pow( h, 2 ) ) );
    }

} )( window );