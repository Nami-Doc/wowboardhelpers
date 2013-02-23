export cheatsheet = {}

export bind-key = !(bind, lang-key, cb) ->
	cheatsheet[bind] = lang lang-key

	bind .= toUpperCase!charCodeAt!

	document.addEventListener 'keydown' !->
		return unless bind is it.keyCode
		return unless it.target is QS 'html' #not typing
		it.preventDefault!

		cb!