~ require! 'lib/lang'

#cheatsheet-container
	// that's meh but ...
	span.clear
	#cheatsheet
		// what's wrong with you blizz ?
		a.toggler.ui-button.button1
			span: span= lang.cheatsheet

		ul
			for key, val of @cheatsheet
				li
					b= key
					| : #val