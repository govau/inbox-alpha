import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import format from 'date-fns/format'
import styled, { css } from 'styled-components'
import { Flex, Box } from 'grid-styled'
import ReactDayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import { graphql, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import withData from '../../../components/with-data'
import { ScrollToTopOnMount } from '../../../components/scroll-to-top'
import Master from '../../../components/layout'
import { Button, ButtonLink } from '../../../components/button'
import Loader from '../../../components/loader'
import Radio from '../../../components/radio'
import Icon from '../../../components/icon'
import IconLink from '../../../components/icon-link'
import { Heading, H1 } from '../components'
import CacheBustingRedirect from '../../../components/cache-busting-redirect'

// copypastad. should be in utils somewhere
const refNo = conversation =>
  `${conversation.service.agency.name
    .substring(0, 3)
    .toUpperCase()}${conversation.id.slice(-8).toUpperCase()}`

const getConversation = gql`
  query($conversationID: ID!) {
    conversation(where: { id: $conversationID }) {
      id
      service {
        agency {
          name
        }
      }
    }
  }
`

const createBooking = gql`
  mutation(
    $conversationID: ID!
    $sentAt: String
    $userResponse: String
    $serviceResponse: String
  ) {
    userMessage: createMessage(
      data: {
        sentAt: $sentAt
        conversation: { connect: { id: $conversationID } }
        sender: { create: { source: User } }
        sections: {
          create: [
            { kind: Markdown, markdown: { create: { source: $userResponse } } }
          ]
        }
      }
    ) {
      id
    }

    serviceResponse: createMessage(
      data: {
        sentAt: $sentAt
        readAt: $sentAt
        conversation: { connect: { id: $conversationID } }
        sender: { create: { source: Service } }
        sections: {
          create: [
            {
              kind: Markdown
              markdown: { create: { source: $serviceResponse } }
            }
            { kind: MakePaymentCall }
          ]
        }
      }
    ) {
      id
    }
  }
`

const LegendWrapper = styled.div`
  & * + * {
    margin-top: 0;
  }
`

const smallHeadingCSS = css`
  height: 1.8em;
  font-weight: bold;
  font-size: 18px;
`

const SmallHeading = styled.div`
  ${smallHeadingCSS};
`

const LegendBox = styled(Box)`
  height: 1.6em;
  background-color: ${({ color }) => color};
  &:not(:last-child) {
    border-right: 2px solid #fff;
  }
`

const availabilityPalette = {
  mostAvailable: '#d7ea69',
  available: '#e2f091',
  leastAvailable: '#f1f4d5',
  unavailable: '#cdcdcd',
}

const Legend = () => (
  <LegendWrapper>
    <SmallHeading>Interview times</SmallHeading>
    <Flex alignItems="baseline">
      <LegendBox w={[1 / 4]} color={availabilityPalette.mostAvailable} />
      <LegendBox w={[1 / 4]} color={availabilityPalette.available} />
      <LegendBox w={[1 / 4]} color={availabilityPalette.leastAvailable} />
      <LegendBox w={[1 / 4]} color={availabilityPalette.unavailable} />
    </Flex>
    <Flex alignItems="baseline">
      <Box>Available</Box>
      <Box ml="auto">Unavailable</Box>
    </Flex>
  </LegendWrapper>
)

const SideWrapper = styled.div`
  margin-right: 3em;
`

const day = 'day'

const mostAvailableClassName = 'most-available'
const availableClassName = 'available'
const leastAvailableClassName = 'least-available'
const unavailableClassName = 'unavailable'

const classNames = {
  container: 'DayPicker',
  wrapper: 'DayPicker-wrapper',
  interactionDisabled: 'DayPicker--interactionDisabled',

  navBar: 'DayPicker-NavBar',
  navButtonPrev: 'DayPicker-NavButton DayPicker-NavButton--prev',
  navButtonNext: 'DayPicker-NavButton DayPicker-NavButton--next',
  navButtonInteractionDisabled: 'DayPicker-NavButton--interactionDisabled',

  months: 'DayPicker-Months',
  month: 'DayPicker-Month',
  caption: 'DayPicker-Caption',
  weekdays: 'DayPicker-Weekdays',
  weekdaysRow: 'DayPicker-WeekdaysRow',
  weekday: 'DayPicker-Weekday',
  body: 'DayPicker-Body',
  week: 'DayPicker-Week',
  day: `DayPicker-Day ${day}`,

  footer: 'DayPicker-Footer',
  todayButton: 'DayPicker-TodayButton',

  today: 'DayPicker-Day--today',
  selected: 'DayPicker-Day--selected',
  disabled: 'DayPicker-Day--disabled',
  outside: 'DayPicker-Day--outside',
}

const DayPicker = styled(ReactDayPicker).attrs({ classNames })`
  .${classNames.months} {
    margin: 0;
  }
  .${classNames.month} {
    margin: 0;
  }
  .${classNames.caption} > div {
    ${smallHeadingCSS};
  }
  .${day} {
    padding: 1.265rem;
  }
  .${mostAvailableClassName}:not(.${classNames.outside}) {
    background-color: ${availabilityPalette.mostAvailable};
    cursor: pointer;
  }
  .${availableClassName}:not(.${classNames.outside}) {
    background-color: ${availabilityPalette.available};
    cursor: pointer;
  }
  .${leastAvailableClassName}:not(.${classNames.outside}) {
    background-color: ${availabilityPalette.leastAvailable};
    cursor: pointer;
  }
  .${unavailableClassName}:not(.${classNames.outside}) {
    background-color: ${availabilityPalette.unavailable};
    cursor: not-allowed;
  }
  .${unavailableClassName} {
    &:hover {
      background-color: ${availabilityPalette.unavailable} !important;
      border-radius: 0 !important;
    }
  }
  .${classNames.today} {
    color: inherit;
  }
  .${classNames.selected}:not(.${classNames.disabled}):not(.${
  classNames.outside
}) {
    color: #fff;
    background-color: #333;
    border-radius: 0;

    &:hover {
      color: #fff;
      background-color: #333;
      border-radius: 0;
    }
  }
  .${mostAvailableClassName}:not(.${unavailableClassName}):not(.${
  classNames.selected
}),
  .${availableClassName}:not(.${unavailableClassName}):not(.${
  classNames.selected
}),
  .${leastAvailableClassName}:not(.${unavailableClassName}):not(.${
  classNames.selected
}) {
    &:hover {
      background-color: white !important;
      border-radius: 0 !important;
    }
  }
`

const isWeekend = day => day.getDay() === 0 || day.getDay() === 6

const isUnavailable = day => {
  const now = new Date()
  // Dates in past unavailable.
  if (now.getTime() >= day.getTime()) {
    return true
  }
  // Weekends unavailable.
  if (isWeekend(day)) {
    return true
  }
  // Arbitrary day unavailable.
  return (
    day.getDate() === 25 && day.getMonth() === 6 && day.getFullYear() === 2018
  )
}

class Side extends Component {
  state = {
    selectedDay: null,
  }

  handleDayClick = (day, { selected }) => {
    if (isUnavailable(day)) {
      return
    }
    this.setState(() => ({
      selectedDay: selected ? null : day,
    }))

    this.props.onDayChange(selected ? null : day)
  }

  render() {
    const { selectedDay } = this.state

    return (
      <SideWrapper>
        <DayPicker
          selectedDays={selectedDay}
          onDayClick={this.handleDayClick}
          modifiers={{
            [mostAvailableClassName]: day =>
              !isWeekend(day) &&
              ((day.getDate() >= 16 && day.getDate() <= 21) ||
                day.getDate() === 29),
            [availableClassName]: day =>
              !isWeekend(day) &&
              (day.getDate() === 15 ||
                day.getDate() === 22 ||
                day.getDate() === 8),
            [leastAvailableClassName]: day =>
              !isWeekend(day) &&
              ((day.getDate() >= 1 && day.getDate() <= 14) ||
                (day.getDate() >= 23 && day.getDate() <= 28) ||
                (day.getDate() >= 30 && day.getDate() <= 31)),
            [unavailableClassName]: day => isUnavailable(day),
          }}
        />
        <Legend />
      </SideWrapper>
    )
  }
}

const TimeSections = styled.section``

const TimeSection = styled.div`
  padding: 1em 0;
  border-top: 1px solid #e2eefd;
  &:last-child {
    border-bottom: 1px solid #e2eefd;
  }
`

const timeSections = [
  {
    heading: 'Morning',
    timeSlots: ['08:15 - 08:30', '09:45 - 10:00'],
  },
  {
    heading: 'Afternoon',
    timeSlots: ['12:30 - 12:45', '15:00 - 15:15'],
  },
  {
    heading: 'Evening',
    timeSlots: ['17:30 - 17:45', '18:45 - 19:00'],
  },
]

class Step1 extends Component {
  state = {
    timeSlot: this.props.defaultTimeSlot,
  }

  handleSubmit = e => {
    e.preventDefault()

    const { timeSlot } = this.state

    this.props.onSubmit(timeSlot)
  }

  handleTimeSlotChange = e => {
    const timeSlot = e.currentTarget.value

    this.setState(() => ({ timeSlot }))
  }

  render() {
    const { id } = this.props
    const { timeSlot } = this.state

    return (
      <Fragment>
        <IconLink to={`/messages/${id}`} icon={<Icon>arrow_back</Icon>}>
          Back
        </IconLink>

        <h2>Choose a time</h2>
        <p>
          First available time is: <strong>Tuesday 1 July 2018</strong>
        </p>

        <form onSubmit={this.handleSubmit}>
          <TimeSections>
            {timeSections.map(section => (
              <TimeSection key={section.heading}>
                <Flex alignItems="baseline">
                  <Box>
                    <SmallHeading>{section.heading}</SmallHeading>
                    {section.timeSlots.map(ts => (
                      <Radio
                        key={ts}
                        name="timeSlot"
                        onChange={this.handleTimeSlotChange}
                        value={ts}
                        checked={ts === timeSlot}
                        title={ts}
                      >
                        {ts}
                      </Radio>
                    ))}
                  </Box>
                  <Box ml="auto">
                    <a href="">show more times</a>
                  </Box>
                </Flex>
              </TimeSection>
            ))}
          </TimeSections>

          <Flex alignItems="baseline">
            <Box>
              <p>
                An {this.props.conversation.service.agency.name} agent will call
                you on 0404 *** *89
              </p>
            </Box>
            <Box ml="auto">
              <Link to="/profile">change</Link>
            </Box>
          </Flex>

          <Flex alignItems="baseline">
            <Box>
              <Button type="submit" color="black">
                Book call back
              </Button>
            </Box>
            <Box>
              <ButtonLink to={`/messages/${id}`} color="transparent">
                Cancel
              </ButtonLink>
            </Box>
          </Flex>
        </form>
      </Fragment>
    )
  }
}

const Confirmation = styled.div`
  background-color: #eee;
  padding: 1em;

  @media screen and (min-width: 768px) {
    max-width: 50rem;
  }
`

const fmttime = t => format(t, 'D MMM YYYY')

class Step2 extends Component {
  handleSubmit = e => {
    e.preventDefault()

    this.props.onSubmit()
  }

  render() {
    const { id, time, timeSlot, caseSubject } = this.props

    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <Confirmation>
            <p>
              An {this.props.conversation.service.agency.name} agent will call
              you on 0404 *** *89
              {time && (
                <Fragment>
                  {' '}
                  on <strong>{fmttime(time)}</strong>
                </Fragment>
              )}{' '}
              {timeSlot && (
                <Fragment>
                  between <strong>{timeSlot}</strong>{' '}
                </Fragment>
              )}
              about your <strong>{caseSubject}</strong>.
            </p>
            <Button type="button" onClick={this.props.onBack} appearance="link">
              Change time
            </Button>
          </Confirmation>
          <Flex alignItems="baseline">
            <Box>
              <Button type="submit" color="black">
                Send
              </Button>
            </Box>
            <Box>
              <ButtonLink to={`/messages/${id}`} color="transparent">
                Cancel
              </ButtonLink>
            </Box>
          </Flex>
        </form>
      </Fragment>
    )
  }
}

class Page extends Component {
  state = {
    stepChanges: 0,
    step: 1,
    time: null,
    timeSlot: null,
  }

  incrementStep = () => {
    this.setState(({ stepChanges, step }) => ({
      stepChanges: stepChanges + 1,
      step: step + 1,
    }))
  }

  decrementStep = () => {
    this.setState(({ stepChanges, step }) => ({
      stepChanges: stepChanges + 1,
      step: step - 1,
    }))
  }

  handleStep1Submit = timeSlot => {
    this.setState(() => ({ timeSlot }))
    this.incrementStep()
  }

  handleDayChange = day => {
    this.setState(() => ({ time: day }))
  }

  handleStep2Submit = () => {
    this.incrementStep()
  }

  handleStep2Back = () => {
    this.decrementStep()
  }

  handleStep3Submit = () => {
    const { history, match } = this.props

    history.push(`/messages/${match.params.id}`)
  }

  render() {
    const { match } = this.props
    const { stepChanges, step, time, timeSlot } = this.state

    let content

    switch (true) {
      case step === 1:
        content = (
          <Fragment>
            <ScrollToTopOnMount key={stepChanges} />
            <Heading>
              <H1>Book a call with {this.props.conversation.service.agency.name}</H1>
            </Heading>
            <Master side={<Side onDayChange={this.handleDayChange} />}>
              <Step1
                conversation={this.props.conversation}
                id={match.params.id}
                onSubmit={this.handleStep1Submit}
                defaultTimeSlot={timeSlot}
              />
            </Master>
          </Fragment>
        )
        break
      case step === 2 || step === 3:
        content = (
          <Fragment>
            <ScrollToTopOnMount key={stepChanges} />
            <Heading>
              <H1>Confirm your call back time</H1>
            </Heading>
            <Master>
              <Mutation mutation={createBooking}>
                {(create, { loading, error, data, client }) => (
                  <Fragment>
                    <Step2
                      conversation={this.props.conversation}
                      id={match.params.id}
                      time={time}
                      timeSlot={timeSlot}
                      caseSubject={`Tax Return 2017 (transaction ID: ${refNo(
                        this.props.conversation
                      )})`}
                      onSubmit={e => {
                        create({
                          variables: {
                            conversationID: match.params.id,
                            sentAt: new Date().toString(),
                            userResponse: `
**Call back request**

**Number**: 0404 xxx x89  
**Date**: ${fmttime(time)}  
**Time**: ${timeSlot}  
**Case ID**:  ${refNo(this.props.conversation)}
                            `,
                            serviceResponse: `
**Call back confirmation**

Transaction ID: ${refNo(this.props.conversation)}

We'll call you on **${fmttime(
                              time
                            )}** at **${timeSlot}** on the number you provided **0404 xxx x89**
                            `,
                          },
                        })
                      }}
                      onBack={this.handleStep2Back}
                    />
                    {loading ? (
                      <Loader icon="lock">
                        Processing your call back request with{' '}
                        {this.props.conversation.service.agency.name}
                      </Loader>
                    ) : error ? (
                      <details>
                        <summary>there was an error</summary>
                        {error.message}
                      </details>
                    ) : data ? (
                      <CacheBustingRedirect
                        client={client}
                        to={`/messages/${match.params.id}`}
                      />
                    ) : null}
                  </Fragment>
                )}
              </Mutation>
            </Master>
          </Fragment>
        )
        break
      default:
        return null
    }

    return content
  }
}

const RequestCall = graphql(getConversation, {
  options: ({ match }) => ({ variables: { conversationID: match.params.id } }),
})(
  withData(Page, ({ conversation }) => (conversation ? { conversation } : null))
)

export { RequestCall as default }
