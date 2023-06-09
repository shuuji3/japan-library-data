data/city-libraries.csv: data/tokyo.json data/chiba.json
	pnpm start

data/chiba.json:
	http 'https://api.calil.jp/library?apikey=$(env CALIL_API_KEY)&format=json&callback=&pref=千葉県' -o data/chiba.json --pretty format

data/tokyo.json:
	http 'https://api.calil.jp/library?apikey=$(env CALIL_API_KEY)&format=json&callback=&pref=東京都' -o data/tokyo.json --pretty format
