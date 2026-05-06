'use client'
import { useEffect, useState } from 'react'
import { PencilIcon } from '@heroicons/react/24/outline'
import { getCountryByCode, updateCountry } from '@/actions/countryActions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import TextField from '@/components/inputs/TextField'
import ErrorDialog from '@/components/MainDialog/ErrorDialog'
import { ActionResult, ButtonState } from '@/types'
import { CRUD } from '@/lib/data/roleMatrix'
import { MenuItemPath } from '@/lib/data/navigation'
import { Country } from '@prisma/client'
import { useParams } from 'next/navigation'

const CountryUpdate = () => {
  const [error, setError] = useState('')
  const [name, setName] = useState('')

  const params = useParams()

  useEffect(() => {
    getCountryByCode(params.code as string).then((country: ActionResult<Country>) => {
      if (!country.success) {
        setError(country.error || '')
        return
      }
      setName(country.value?.name || '')
    })
  }, [params.code])

  const handleSubmit = async (formData: FormData) => {
    const result = await updateCountry(formData)
    if (!result.success) {
      setError(result.error || 'Unknown error')
    } else {
      // redirect('/catalog/countries') --- IGNORE ---
    }
  }

  const buttons: ButtonState[] = [
    { title: 'Save', Icon: PencilIcon, action: handleSubmit, permission: CRUD.UPDATE },
  ]
  const submitButton = buttons.find((button) => button.action)

  if (error) {
    return <ErrorDialog header='Server error' message={error} />
  }

  return <Layout>
    <main>
      <form action={submitButton?.action}>
        <Toolbar buttons={buttons} menuPath={MenuItemPath.COUNTRIES} />

        <div className="p-4">
          <TextField
            name="code"
            label="Country code"
            value={params.code as string}
            readonly
          />
          <TextField
            name="name"
            label="Country name"
            value={name}
            setValue={setName}
          />
        </div>
      </form>
    </main>
  </Layout>

}

export default CountryUpdate
