import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

type Props = {
    title: string;
    value: string;
    icon: React.ElementType;
    iconBg?: string; // optional if you just want the icon without background
    percentage: string;
};

const StatCard = ({ title, value, percentage, icon: Icon, iconBg }: Props) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <div className={`p-2 rounded-sm ${iconBg}`}>
                    <Icon className="h-4 w-4 text-muted-foreground text-white" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground mt-1">{percentage}</p>
            </CardContent>
        </Card>
    );
};

export default StatCard;
