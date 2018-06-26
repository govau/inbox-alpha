import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Flex, Box } from 'grid-styled'
import ReactDayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'

import { ScrollToTopOnMount } from '../../../components/scroll-to-top'
import Master from '../../../components/layout'
import { Button, ButtonLink } from '../../../components/button'
import Loader from '../../../components/loader'
import Radio from '../../../components/radio'
import Icon from '../../../components/icon'
import IconLink from '../../../components/icon-link'
import { Heading, H1 } from '../components'

const LegendWrapper = styled.div`
  & * + * {
    margin-top: 0;
  }
`

const SmallHeading = styled.div`
  height: 1.8em;
  font-weight: bold;
`

const LegendBox = styled(Box)`
  height: 1.6em;
  background-color: ${({ color }) => color};
  &:not(:last-child) {
    border-right: 2px solid #fff;
  }
`

const Legend = () => (
  <LegendWrapper>
    <SmallHeading>Interview times</SmallHeading>
    <Flex alignItems="baseline">
      <LegendBox w={[1 / 4]} color="#d7ea69" />
      <LegendBox w={[1 / 4]} color="#e2f091" />
      <LegendBox w={[1 / 4]} color="#f1f4d5" />
      <LegendBox w={[1 / 4]} color="#cdcdcd" />
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

const disabledClassName = 'disabled'

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
  .${day} {
  }

  .${disabledClassName}:not(.DayPicker-Day--outside) {
    background-color: #cdcdcd;
  }
`

const Side = () => (
  <SideWrapper>
    <DayPicker
      modifiers={{
        [disabledClassName]: day => {
          // Gray out weekends.
          if (day.getDay() === 0 || day.getDay() === 6) {
            return true
          }
          // Gray out arbitrary day.
          return (
            day.getDate() === 27 &&
            day.getMonth() === 5 &&
            day.getFullYear() === 2018
          )
        },
      }}
    />
    <Legend />
  </SideWrapper>
)

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

        <p>Choose a time</p>
        <p>First available time is: Tuesday 1 July 2018</p>

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
              <p>A Centrelink agent will call you on 0404 *** *89</p>
            </Box>
            <Box ml="auto">
              <Link to="/profile">change</Link>
            </Box>
          </Flex>

          <Flex alignItems="baseline">
            <Box>
              <Button type="submit">Book call back</Button>
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

class Step2 extends Component {
  handleSubmit = e => {
    e.preventDefault()

    this.props.onSubmit()
  }

  render() {
    const { id, timeSlot, caseSubject } = this.props

    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <Confirmation>
            <p>
              A Centrelink agent will call you on 0404 *** *89 between{' '}
              <strong>{timeSlot}</strong> about your{' '}
              <strong>{caseSubject}</strong>.
            </p>
            <Button type="button" onClick={this.props.onBack} appearance="link">
              Change time
            </Button>
          </Confirmation>
          <Flex alignItems="baseline">
            <Box>
              <Button type="submit">Send</Button>
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

class Step3 extends Component {
  componentDidMount() {
    setTimeout(() => this.props.onSubmit(), 3000)
  }

  render() {
    return (
      <Loader icon="lock">
        Processing your call back request with Centrelink
      </Loader>
    )
  }
}

export class Page extends Component {
  state = {
    stepChanges: 0,
    step: 1,
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
    const { stepChanges, step, timeSlot } = this.state

    let content

    switch (true) {
      case step === 1:
        content = (
          <Fragment>
            <ScrollToTopOnMount key={stepChanges} />
            <Heading>
              <H1>Book a call</H1>
            </Heading>
            <Master side={<Side />}>
              <Step1
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
              <Step2
                id={match.params.id}
                timeSlot={timeSlot}
                caseSubject="Tax Return 2017 (transaction ID: ATO4565TYZ)"
                onSubmit={this.handleStep2Submit}
                onBack={this.handleStep2Back}
              />
              {step === 3 && <Step3 onSubmit={this.handleStep3Submit} />}
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
