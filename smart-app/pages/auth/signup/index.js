import SimpleLayout from '@components/layouts/SimpleLayout'

export default function Signup() {

  return (
    <div>
      main
    </div>
  )
}

Signup.getLayout = function (page) {
  return (
    <SimpleLayout>
      {page}
    </SimpleLayout>
  )
}