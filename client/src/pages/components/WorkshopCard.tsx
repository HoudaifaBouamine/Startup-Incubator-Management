import { tokens, makeStyles } from '@fluentui/react-components';
import { format } from "date-fns";
import {
    Body1,
    Body2Strong,
    Caption1,
} from "../../components/typo/Custom";

const useStyles = makeStyles({
    CarWrapper: {
        backgroundColor: tokens.colorNeutralBackground1,
        width: '100%',
        maxWidth: '40rem',
        height: '6.63rem',
        display: 'flex',
        padding: '1rem',
    },
    DateAndPlaceWrapper: {
        width: '140px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
    },
    TimeAndPlaceWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    WorkshopDetailsWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.12rem',
        justifyContent: 'space-between',
    },
    Text: {
        fontWeight: tokens.fontWeightSemibold,
        flexShrink: 0,
    },
    Divider: {
        backgroundColor: tokens.colorNeutralStroke2,
        width: '1px',
        margin: '0 1rem',
        
    },
    Description:{
        lineHeight: '1.2',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    MentorName:{
        color: tokens.colorBrandForeground1,
    }
});

interface WorkshopCardProps {
    title: string;
    description: string;
    mentor: string;
    from: Date;
    to: Date;
    place: string;
}

const WorkshopCard = ({ title, description, mentor, from, to, place }: WorkshopCardProps) => {
        const classes = useStyles();

        return (
                <div className={classes.CarWrapper}>
                    <div className={classes.DateAndPlaceWrapper}>
                        {/* <Text style={typographyStyles.body2}>
                            {format(from, "MMMM do")}
                        </Text> */}
                        <Body2Strong>
                            {format(from, "MMMM do")}
                        </Body2Strong>
                        <div className={classes.TimeAndPlaceWrapper}>
                            <Caption1>
                                {format(from, "h:mm a")} to {format(to, "h:mm a")}
                            </Caption1>
                            <Caption1>
                                {place}
                            </Caption1>
                        </div>
                    </div>
                    <div className={classes.Divider}  />
                    <div className={classes.WorkshopDetailsWrapper}>
                        <Body2Strong className={classes.Text}>
                                {title}
                        </Body2Strong>
                        <Body1 className={classes.Description}>{description}</Body1>
                        <Caption1 className={classes.MentorName}>{mentor}</Caption1>
                        </div>
                </div>
        );
};

export default WorkshopCard;

{/* <div style={{ width: '38rem'}}>
<WorkshopCard from={new Date('2025-08-17T09:00:00')} to={new Date('2025-08-17T17:00:00')} description='A workshop on React and TypeScriptA workshop on React and       
ptA workshop on React and TypeScriptA workshop on React and TypeScriptA workshop on ' mentor='John Doe' place='Room 101' title='React Workshop' />
</div> */}