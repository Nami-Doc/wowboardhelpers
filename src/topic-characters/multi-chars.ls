return unless topic

account-characters = if localStorage.getItem "account-characters"
	JSON.parse that
else {}

post-characters = QSA '.post-character'
for post-character in post-characters
	icon-ignore = post-character.querySelector '.icon-ignore'
	continue unless icon-ignore # self account
	name = post-character.querySelector '.char-name-code' .innerHTML.trim!

	[, account] = /ignore\(([0-9]+)/ == icon-ignore.onclick.toString!
	
	post-character.dataset <<< {account, name}

	if name not in acc = account-characters[][account]
		acc.push name

# save it !
localStorage.setItem "account-characters" JSON.stringify account-characters

for post-character in post-characters
	{account, name: current} = post-character.dataset
	continue unless account
	continue if account-characters[account]length is 1

	post-character.appendChild do
		template 'multi-chars' {current, characters: account-characters[account]}