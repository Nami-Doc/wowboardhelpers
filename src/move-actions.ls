return unless posts

QS '.forum-options'
	..parentNode.removeChild ..

	QS '.content-trail' .appendChild ..