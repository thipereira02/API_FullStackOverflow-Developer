import './setup';
import app from './app';

app.listen(Number(process.env.PORT), () => {
  console.log(`Server is listening on port ${Number(process.env.PORT)}.`);
});
