import './index.css'

const MoneyDetails = props => {
  const {head, para, url, alt, testid, classValue} = props

  return (
    <li className={classValue}>
      <img src={url} alt={alt} />
      <div>
        <p className="head">{head}</p>
        <p className="para" data-testid={testid}>
          Rs {para}
        </p>
      </div>
    </li>
  )
}

export default MoneyDetails
