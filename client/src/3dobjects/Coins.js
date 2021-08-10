import Coin from '../3dobjects/BucketCoin'

export default function Coins(props) {
  const container = []
  for (let i = 0; i < props.numOfCoins; i++) {
    container.push(<Coin scale={10} position={[0, 4, 0]} rotation={[0, Math.random() * 100, 0]} />)
  }
  return container
}