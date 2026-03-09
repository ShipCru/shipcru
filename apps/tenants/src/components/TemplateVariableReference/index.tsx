'use client'

import { useCallback, useState } from 'react'
import { Banner, Collapsible, Drawer, DrawerToggler, Pill, useDrawerSlug } from '@payloadcms/ui'

import {
  getTemplateVariableReference,
  type VariableReferenceGroup,
} from '@/lib/resume-pages/templateVariableReference'

const groups: VariableReferenceGroup[] = getTemplateVariableReference()

function VariableRow({ name, example }: { name: string; example: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    const token = `$(${name})`
    navigator.clipboard.writeText(token)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [name])

  return (
    <tr
      className="cursor-pointer transition-colors hover:bg-(--theme-elevation-50)"
      onClick={handleCopy}
      title={`Click to copy $(${name})`}
    >
      <td className="whitespace-nowrap p-1.5 align-middle border-b border-(--theme-elevation-100)">
        <span className="flex items-center gap-2">
          <code className="font-mono text-[0.8125rem] px-1 rounded-sm bg-(--theme-elevation-50) text-(--theme-text)">
            {name}
          </code>
          {copied && <Pill pillStyle="success">Copied</Pill>}
        </span>
      </td>
      <td className="p-1.5 align-middle wrap-break-word text-(--theme-elevation-500) border-b border-(--theme-elevation-100)">
        {example}
      </td>
    </tr>
  )
}

function VariableGroup({ group, variables }: VariableReferenceGroup) {
  return (
    <Collapsible
      className="border border-(--theme-elevation-150) rounded overflow-hidden"
      header={
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-(--theme-text)">{group}</span>
          <Pill pillStyle="light">{variables.length}</Pill>
        </div>
      }
      initCollapsed={false}
    >
      <table className="w-full border-collapse text-[0.8125rem] leading-snug">
        <thead>
          <tr>
            <th className="text-left p-1.5 border-b border-(--theme-elevation-150) text-xs font-semibold uppercase tracking-wide text-(--theme-elevation-500)">
              Variable
            </th>
            <th className="text-left p-1.5 border-b border-(--theme-elevation-150) text-xs font-semibold uppercase tracking-wide text-(--theme-elevation-500)">
              Example
            </th>
          </tr>
        </thead>
        <tbody>
          {variables.map(({ name, example }) => (
            <VariableRow key={name} name={name} example={example} />
          ))}
        </tbody>
      </table>
    </Collapsible>
  )
}

export function TemplateVariableReference() {
  const slug = useDrawerSlug('template-variable-reference')

  return (
    <>
      <DrawerToggler slug={slug} className="btn btn--style-secondary btn--size-small">
        Template Variables
      </DrawerToggler>
      <Drawer slug={slug} title="Available Template Variables">
        <div className="px-(--gutter-h) pb-(--gutter-h)">
          <Banner type="default" className="mb-6">
            <span className="block">
              Use{' '}
              <code className="font-mono text-[0.85em] px-1 rounded-sm bg-(--theme-elevation-100) text-(--theme-text)">
                {'$(variable)'}
              </code>{' '}
              or{' '}
              <code className="font-mono text-[0.85em] px-1 rounded-sm bg-(--theme-elevation-100) text-(--theme-text)">
                {'{{variable}}'}
              </code>{' '}
              syntax.
            </span>
            <span className="block mt-1">
              Modifiers:{' '}
              <code className="font-mono text-[0.85em] px-1 rounded-sm bg-(--theme-elevation-100) text-(--theme-text)">
                :nbsp
              </code>{' '}
              <code className="font-mono text-[0.85em] px-1 rounded-sm bg-(--theme-elevation-100) text-(--theme-text)">
                :capitalizeFirstLetter
              </code>{' '}
              <code className="font-mono text-[0.85em] px-1 rounded-sm bg-(--theme-elevation-100) text-(--theme-text)">
                {':formatCurrency{USD}'}
              </code>
            </span>
          </Banner>

          <div className="flex flex-col gap-2">
            {groups.map(({ group, variables }) => (
              <VariableGroup key={group} group={group} variables={variables} />
            ))}
          </div>
        </div>
      </Drawer>
    </>
  )
}
