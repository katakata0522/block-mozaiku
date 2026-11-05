import fs from 'fs';

fs.writeFileSync('public/test_preview.html', `<!DOCTYPE html>
<html>
<body style="background:#111; color:#fff; font-family:sans-serif; text-align:center;">
  <h2>penguin_29.jpg</h2>
  <img src="photos/penguin_29.jpg" style="height:240px; border:1px solid #fff;"/>
  <h2>penguin_52.jpg</h2>
  <img src="photos/penguin_52.jpg" style="height:240px; border:1px solid #fff;"/>
  <h2>eiffel_tower.jpg</h2>
  <img src="photos/eiffel_tower.jpg" style="height:240px; border:1px solid #fff;"/>
</body>
</html>
`);
console.log('Written test_preview.html');
