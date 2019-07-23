import * as React from 'react'
import Select from 'react-select'
import { fromJS } from 'immutable'
import { reactSelectStyles } from 'netlify-cms-ui-default/dist/esm/styles'
import { WidgetProps } from '@ncwidgets/common-typings'

type Option = Record<'label' | 'value', string>

interface WidgetState {
  options: Option[];
}

export class FileRelationWidget extends React.Component<WidgetProps, WidgetState> {
  public state: WidgetState = {
    options: [],
  }

  public async componentDidMount() {
    const { loadEntry, field } = this.props
    
    const collection = field.get('collection')
    const file = field.get('file')
    const fieldName = field.get('field_name')
    const fieldId = field.get('field_id')
    const fieldDisplay: string = field.get('field_display') || fieldId
  
    const results = await loadEntry(collection, file)
    const data = results.payload.entry.data[fieldName]
    const options = data.map(option => ({
      value: option[fieldId],
      label: option[fieldDisplay],
    }))
    this.setState({ options })
  }

  public changeHandle = selected => {
    const { onChange } = this.props
    if (!selected) onChange([])
    const value = Array.isArray(selected)
      ? selected
      : [ selected ]
    onChange(fromJS(value))
  }

  public render() {
    const {
      field,
      value,
      forID, 
      classNameWrapper, 
      setActiveStyle, 
      setInactiveStyle,
    } = this.props
    const { options } = this.state

    const isMultiple: boolean = field.get('multiple')

    let selected: Option[]
    if (!value) selected = []
    else if (typeof value === 'string') {
      const maybeSelect = options.find(option => option.value === value)
      selected = maybeSelect ? [maybeSelect] : []
    }
    else selected = value.toJS()

    return (
      <div>
        <Select
          inputId={forID}
          isMulti={isMultiple}
          onChange={this.changeHandle}
          className={classNameWrapper}
          onFocus={setActiveStyle}
          onBlur={setInactiveStyle}
          styles={reactSelectStyles}
          name="categories"
          isClearable={false}
          value={selected}
          options={options}
          placeholder="select..."
        />
      </div>
    )
  }
}
