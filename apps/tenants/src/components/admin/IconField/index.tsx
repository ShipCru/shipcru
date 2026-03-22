'use client'

import type { OptionObject, SelectFieldClientComponent } from 'payload'

import { useMemo } from 'react'
import {
  components,
  type OptionProps,
  type SingleValueProps,
  type ValueContainerProps,
} from 'react-select'
import {
  FieldDescription,
  FieldLabel,
  ReactSelect,
  type ReactSelectOption,
  useField,
} from '@payloadcms/ui'
import { mergeFieldStyles } from '@payloadcms/ui/shared'

import { iconMap } from '@/components/icons'

const IconLabel = ({ value, label }: { value: string; label: string }) => {
  const IconComponent = iconMap[value]
  return (
    <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
      {IconComponent ? <IconComponent className="h-5 w-5 shrink-0" /> : null}
      <span className="truncate">{label}</span>
    </div>
  )
}

const IconOption = (props: OptionProps<ReactSelectOption>) => (
  <components.Option {...props}>
    <IconLabel
      value={props.data.value as string}
      label={String(props.data.label ?? props.data.value)}
    />
  </components.Option>
)

const IconSingleValue = (props: SingleValueProps<ReactSelectOption>) => (
  <components.SingleValue
    {...props}
    className="flex min-w-0 max-w-[calc(100%-40px)] flex-1 items-center gap-2 overflow-hidden"
  >
    <IconLabel
      value={props.data.value as string}
      label={String(props.data.label ?? props.data.value)}
    />
  </components.SingleValue>
)

const IconValueContainer = (props: ValueContainerProps<ReactSelectOption>) => (
  <components.ValueContainer {...props} className="flex flex-wrap overflow-hidden" />
)

export const IconField: SelectFieldClientComponent = ({ field, path, readOnly }) => {
  const { setValue, value } = useField<string>({ path })
  const styles = useMemo(() => mergeFieldStyles(field), [field])

  const options: OptionObject[] = (field.options ?? []).map((opt) =>
    typeof opt === 'string' ? { label: opt, value: opt } : opt,
  )

  const selectedOption = options.find((opt) => opt.value === value)

  return (
    <div style={styles} className="field-type">
      <FieldLabel label={field.label} path={path} required={field.required} />
      <ReactSelect
        isClearable={!field.required}
        disabled={readOnly}
        onChange={(option) => {
          if (!option || Array.isArray(option)) {
            setValue(null)
          } else {
            setValue((option as ReactSelectOption).value as string)
          }
        }}
        options={options}
        value={
          selectedOption ? { label: selectedOption.label, value: selectedOption.value } : undefined
        }
        components={{
          Option: IconOption,
          SingleValue: IconSingleValue,
          ValueContainer: IconValueContainer,
        }}
      />
      <FieldDescription description={field.admin?.description} path={path} />
    </div>
  )
}
